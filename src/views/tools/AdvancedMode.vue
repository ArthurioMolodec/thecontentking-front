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
								<h3 class="title box mb-3">Image Generator</h3>

								<div class="row mt-10" v-for="generatedImage, index in generatedImages.reverse()" :key="index">
									<div class="item">
										<div class="image">
											<img :src="generatedImage.src" alt="">
										</div>
										<div class="group">
											<a href="#" class="link">Upscale</a>
											<a href="#" class="link">Variations</a>
											<a href="#" class="download">
												<img src="@/assets/icons/download.svg" alt="">
											</a>
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
			const limits = store.getters.getAccountLimit('ai-images') || {};
			this.left_count = limits.leftCount ?? null;
			return limits;
		}
	},
	methods: {
		async sendForm() {
			this.$refs.submit.classList.add('preloader');

			axios.get(this.API_URL + '/imagegeneratorapi', {
				params: {
					prompt: this.form.prompt,
					image_types: this.form.type,
				}
			}).then(result => {
				this.left_count = result.data.left_count;
				this.$refs.submit.classList.remove('preloader');

				if (result.data.status) {
					Object.values(result.data.result).forEach(imageBase64 => {
						this.generatedImages.push({
							src: `data:image/png;base64,${imageBase64}`,
						})
					});

					this.generate = true;
					return;
				}
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
}</style>