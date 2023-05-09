<template>
	<div class="full-content">
		<div class="bg-image">
			<Header />

			<div class="content bg">
				<v-container>
					<div class="tools offset-top">
						<Sidebar />

						<div class="pt-8 grid">
							<div class="image-generate">
								<h3 class="title box mb-3">Image Generator</h3>

								<v-form action="#" method="GET" class="mt-7 form-generate" ref="form"
									@submit.prevent="sendForm">
									<!-- <label class="field field-select">
										<div class="text">Image Type</div>
										<select v-model="form.type">
											<option v-for="(option, index) in select" :key="index" :value="option">{{ option
											}}</option>
										</select>
									</label> -->

									<!-- <label class="field field-file">
										<input type="file" placeholder="Generate from an uploaded photo" accept="image/png, image/jpeg">
										<div class="file">
											<span class="placeholder">Generate from an uploaded photo</span>
										</div>
									</label> -->

									<label class="field mt-9">
										<div class="text">What should AI draw?</div>
										<textarea placeholder="Bird, colorful, realistic, high detailed"
											v-model="form.prompt"></textarea>
									</label>
									<input type="submit" class="btn" value="Generate" ref="submit">
								</v-form>
							</div>

							<div class="image-results" v-if="generate">
								<h3 class="title box mb-3">Images:</h3>

								<div v-for="generatedImage, index in generatedImages.reverse()" :key="index">
									<div v-if="generatedImage.status === 'generating' || generatedImage.status === 'completed'"
										class="row mt-10">
										<div v-for="(imagePart, index) in generatedImage.imageParts" :key="index"
											class="item">
											<div class="image">
												<img :src="imagePart[0]" alt="">
											</div>
											<div class="group">
												<a v-if="generatedImage.status === 'completed'" @click.prevent="loadUpscaled(generatedImage.id, imagePart[1])" class="link">Upscale</a>
												<!-- <a href="#" class="link">Variations</a> -->
												<a @click.prevent="openImageInNewTab(imagePart[0])" target="_blank"
													class="download">
													<img src="@/assets/icons/download.svg" alt="">
												</a>
											</div>
										</div>
									</div>

									<!-- <div class="item">
										<div class="image">
											<img src="@/assets/images/image-2.jpeg" alt="">
										</div>
										<div class="group">
											<a href="#" class="link">Upscale</a>
											<a href="#" class="link">Variations</a>
											<a href="#" class="download">
												<img src="@/assets/icons/download.svg" alt="">
											</a>
										</div>
									</div>

									<div class="item">
										<div class="image">
											<img src="@/assets/images/image-3.jpeg" alt="">
										</div>
										<div class="group">
											<a href="#" class="link">Upscale</a>
											<a href="#" class="link">Variations</a>
											<a href="#" class="download">
												<img src="@/assets/icons/download.svg" alt="">
											</a>
										</div>
									</div>

									<div class="item">
										<div class="image">
											<img src="@/assets/images/image-4.jpeg" alt="">
										</div>
										<div class="group">
											<a href="#" class="link">Upscale</a>
											<a href="#" class="link">Variations</a>
											<a href="#" class="download">
												<img src="@/assets/icons/download.svg" alt="">
											</a>
										</div>
									</div> -->
								</div>
							</div>
						</div>
					</div>
				</v-container>
			</div>

			<Footer />
		</div>
	</div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import axios from 'axios';
import store from '@/store';

export default {
	components: {
		Header,
		Footer,
		Sidebar
	},
	data() {
		return {
			generatedImages: [],
			left_count: null,
			imagesGeneration: {},
			select: [
				'Logo',
				'Flyers',
				'Instagram Post',
				'Video Thumbnails',
				'Pamphlets',
				'Proposals'
			],
			form: {
				type: null,
				prompt: null,
			},
			generate: false
		}
	},
	computed: {
		limits() {
			const limits = store.getters.getAccountLimit(this.$route.name + 'Api') || {};
			this.left_count = limits.leftCount ?? null;
			return limits;
		}
	},
	methods: {
		openImageInNewTab(src) {
			var image = new Image();
			image.src = src;

			var w = window.open("");
			w.document.write(image.outerHTML);
		},
		async startUpscale(id, part_id) {
			if (this.imagesGeneration[id].partsUpscaling?.[part_id]?._image) {
				this.openImageInNewTab(this.imagesGeneration[id].partsUpscaling?.[part_id]?._image);
				return;
			}

			const current_status = this.imagesGeneration[id].partsUpscaling?.[part_id]?.status || 'new';
			if (current_status !== 'errored' && current_status !== 'new') {
				return;
			}

			if (current_status === 'new') {
				this.imagesGeneration[id].partsUpscaling[part_id] = {
					status: 'created',
					interval: null,
					id: null,
					isInProcessing: false,
				}

				await axios.get(this.API_URL + '/advancedimagegeneratorapiresult', {
					params: {
						action: 'upscale',
						id: id,
						part_id: part_id,
					}
				})
				.then(result => {
					if (!result?.data?.id) {
						console.error(result);
						return;
					}
					this.imagesGeneration[id].partsUpscaling[part_id].id = result?.data?.id;
				});

				if (!this.imagesGeneration[id].partsUpscaling[part_id].id) {
					this.imagesGeneration[id].partsUpscaling[part_id].status = 'new';
					alert('Some error occured! Please try again later.');
					return;
				}

				this.imagesGeneration[id].partsUpscaling[part_id].interval = setInterval(() => {
					this.loadUpscaled(id, part_id);
				}, 1000);

			}

		},
		async loadUpscaled(id, part_id) {
			if (!this.imagesGeneration[id].partsUpscaling?.[part_id]) {
				await this.startUpscale(id, part_id);
				return;
			}

			if (this.imagesGeneration[id].partsUpscaling[part_id].image) {
				this.openImageInNewTab(this.imagesGeneration[id].partsUpscaling[part_id].image);
				clearInterval(this.imagesGeneration[id].partsUpscaling[part_id].interval);
				return;
			}

			if (this.imagesGeneration[id].partsUpscaling[part_id].isInProcessing) {
				return;
			}
			this.imagesGeneration[id].partsUpscaling[part_id].isInProcessing = true;

			const part_external_id = this.imagesGeneration[id].partsUpscaling[part_id].id;

			await axios.get(this.API_URL + '/advancedimagegeneratorapiresult', {
				params: {
					action: 'get-upscale',
					id: part_external_id,
				}
			})
			.then(result => {
				if (result?.data?.status !== 'success') {
					return;
				}

				if (result?.data?.data?.is_waiting) {
					return;
				}

				if (!result?.data?.data?.result) {
					this.imagesGeneration[id].partsUpscaling[part_id].status = 'errored';
					clearInterval(this.imagesGeneration[id].partsUpscaling[part_id].interval);
					return;
				}

				this.imagesGeneration[id].partsUpscaling[part_id].image = result?.data?.data?.result;
				this.imagesGeneration[id].partsUpscaling[part_id]._image = result?.data?.data?.result;
			}).catch(error => {
				console.error(error);
			});

			this.imagesGeneration[id].partsUpscaling[part_id].isInProcessing = false;
		},
		async checkImage(id) {
			if (this.imagesGeneration[id].isInProcessing) {
				return;
			}
			this.imagesGeneration[id].isInProcessing = true;

			await axios.get(this.API_URL + '/advancedimagegeneratorapiresult', {
				params: {
					id: id,
				}
			})
			.then(result => {
				if (result?.data?.status !== 'success') {
					return;
				}

				if (!result?.data?.data?.result?.length) {
					if (!result?.data?.data?.is_waiting) {
						this.imagesGeneration[id].status = 'errored';
						clearInterval(this.imagesGeneration[id].interval);
						this.$refs.submit.classList.remove('preloader');
					}
					return;
				}

				const parts = result?.data?.data?.result;

				const [[_percent, images]] = parts.slice(-1) || [0, []];
				const percent = +_percent.replace('%', '');

				if (images?.length) {
					this.imagesGeneration[id].imageParts = images.map((r, index) => [r, index + 1]);
					this.imagesGeneration[id].imagePercentGenerated = percent;
					this.imagesGeneration[id].status = 'generating';
				}

				if (percent >= 90 && !result?.data?.data?.is_waiting || !result?.data?.data?.is_waiting) {
					this.imagesGeneration[id].status = 'completed';
					clearInterval(this.imagesGeneration[id].interval);
					this.$refs.submit.classList.remove('preloader');
				}
			}).catch(error => {
				console.error(error);
			})

			this.imagesGeneration[id].isInProcessing = false;
		},
		async sendForm() {
			this.$refs.submit.classList.add('preloader');

			axios.get(this.API_URL + '/advancedimagegeneratorapi', {
				params: {
					prompt: this.form.prompt,
					image_types: this.form.type,
				}
			})
			.then(result => {
				if (!result?.data?.status) {
					this.left_count = result.data.left_count;
					return;
				}

				const image = {
					id: result.data.id,
					imageParts: [],
					status: 'created',
					isInProcessing: false,
					imagePercentGenerated: 0,

					partsUpscaling: {},
				};

				this.imagesGeneration[image.id] = image;
				this.generatedImages.push(image);

				image['interval'] = setInterval(() => {
					this.checkImage(image.id);
				}, 1000);

				this.generate = true;
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.left-images-text {
	color: red;
}

.grid {
	display: grid;
	grid-template-columns: 360px 380px;
	grid-gap: 0 46px;

	@media (max-width: 1279px) {
		grid-template-columns: 1fr;
	}
}

.form-generate {
	.btn {
		display: block;
		margin-top: 17px;
		width: 100%;
	}

	textarea {
		min-height: 390px;
	}
}

.image-results {
	.row {
		display: grid;
		grid-template-columns: repeat(2, 177px);
		grid-gap: 40px 30px;
		justify-content: flex-start;

		.image {
			img {
				display: block;
				width: 100%;
			}
		}

		.group {
			display: flex;
			align-content: center;
			margin-top: 7px;
		}

		.link {
			display: inline-block;
			font-size: 12px;
			background: #2F2F2F;
			border-radius: 5px;
			padding: 4px 11px;
			color: #fff;
			text-decoration: none;
			transition: all 0.3s;

			&:hover {
				background: #fff;
				color: #000;
			}
		}

		.link+.link {
			margin-left: 2px;
		}

		.download {
			margin-left: auto;
			line-height: 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	@media (max-width: 1279px) {
		margin-top: 50px;
	}

	@media (max-width: 768px) {
		.row {
			grid-template-columns: 1fr;
		}
	}
}
</style>