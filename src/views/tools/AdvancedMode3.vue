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

								<label class="field field-select">
									<div class="text">Mode</div>
									<select v-model="form.type">
										<option value="image">Image (512x512)</option>
										<option value="qr_code">QR Code</option>
									</select>
								</label>

								<v-form action="#" method="GET" class="mt-7 form-generate" ref="form"
									@submit.prevent="sendForm">
									<label class="field field-select" v-if="form.type === 'qr_code'">
										<div class="text">Model</div>
										<select v-model="form.model">
											<option value="epicrealism_pureEvolutionV5-inpainting.safetensors [caa95002a1]">
												epicrealism_pureEvolutionV5-inpainting.safetensors [caa95002a1]</option>
											<option value="v1-5-pruned-emaonly.safetensors [6ce0161689]">Animated
												(CyberRealistic)</option>
										</select>
									</label>

									<label class="field mt-9" v-if="form.type === 'qr_code'">
										<div class="text">Link for QR Code</div>
										<input v-model="form.url" placeholder="https://test.test/" />
									</label>
									<label class="field mt-9">
										<div class="text">What should AI draw?</div>
										<textarea placeholder="Bird, colorful, realistic, high detailed"
											v-model="form.prompt"></textarea>
									</label>
									<label class="field field-select" v-if="form.type === 'qr_code'">
										<div class="text">QR code strength</div>
										<p style="color:white;">{{ form.qr_code_strength }}</p>
										<Vue3Slider :handleScale="3" v-model="form.qr_code_strength" alwaysShowHandle="1"
											color="#FB278D" track-color="#FEFEFE" />
									</label>
									<input type="submit" class="btn" :class="{ preloader: generate }"
										:value="isGeneratedImages ? 'Regenerate' : 'Generate'" ref="submit">
								</v-form>

								<button style="color: white; display: block; margin-left: auto; margin-top: 30px;"
									@click="showDisclaimer = true">Disclaimer</button>
							</div>

							<div class="image-results" v-if="generatedImages.length">
								<h3 class="title box mb-3">Images:</h3>
								<div v-for="generatedImage, index in generatedImagesList" :key="index">
									<div v-if="generatedImage.status === 'generating' || generatedImage.status === 'completed'"
										class="row mt-10">
										<div v-for="(imagePart, index) in generatedImage.imageParts" :key="index"
											class="item">
											<div class="image" style="cursor: pointer;"
												@click.prevent="openImageInNewTab(imagePart[0])">
												<img :src="imagePart[0]" alt="">
											</div>
											<div class="group">
												<a @click.prevent="openImageInNewTab(imagePart[0])" target="_blank"
													class="download">
													<img src="@/assets/icons/download.svg" alt="">
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</v-container>
			</div>

			<Footer />
		</div>


		<div class="disclaimer-modal" v-if="showDisclaimer">
			<div class="modal-content">
				<p><b>Disclaimer:</b></p>

				<p>The QR code generative art offered is intended primarily as a unique and creative form of expression.
					While every effort has been made to maintain the functional integrity of the QR code, due to the
					artistic modification and complexity of the design, we cannot guarantee that the QR code will scan
					accurately on all devices or scanning applications.
				</p>
				<p>Please note that the QR code’s aesthetic elements are the primary focus and its scanning
					functionality is
					secondary. Therefore, the purchase or use of these QR code art pieces should be primarily for their
					artistic value rather than their potential as functional QR codes. We assume no responsibility for
					any
					inconvenience or problems arising from scanning issues.
				</p>
				<button @click="showDisclaimer = false" class="btn">OK</button>
			</div>
		</div>

	</div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import axios from 'axios';
import store from '@/store';
import * as qrcode from 'qrcode';
import Vue3Slider from "vue3-slider"

export default {
	components: {
		Header,
		Footer,
		Sidebar,
		Vue3Slider,
	},
	data() {
		return {
			showDisclaimer: false,
			generatedImages: [],
			left_count: null,
			imagesGeneration: {},
			sessionHash: null,
			qrCodeMask: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAXNSR0IArs4c6QAAAsNJREFUeF7t1SEOwDAUw9D1/pce7cAk87zikDjW73k8BC4CBw0EbgKE4MOHACEIQQgO/BNwIdjhQnDAheBAJODLiKBWYoRYWTr2JEQEtRIjxMrSsSchIqiVGCFWlo49CRFBrcQIsbJ07EmICGolRoiVpWNPQkRQKzFCrCwdexIiglqJEWJl6diTEBHUSowQK0vHnoSIoFZihFhZOvYkRAS1EiPEytKxJyEiqJUYIVaWjj0JEUGtxAixsnTsSYgIaiVGiJWlY09CRFArMUKsLB17EiKCWokRYmXp2JMQEdRKjBArS8eehIigVmKEWFk69iREBLUSI8TK0rEnISKolRghVpaOPQkRQa3ECLGydOxJiAhqJUaIlaVjT0JEUCsxQqwsHXsSIoJaiRFiZenYkxAR1EqMECtLx56EiKBWYoRYWTr2JEQEtRIjxMrSsSchIqiVGCFWlo49CRFBrcQIsbJ07EmICGolRoiVpWNPQkRQKzFCrCwdexIiglqJEWJl6diTEBHUSowQK0vHnoSIoFZihFhZOvYkRAS1EiPEytKxJyEiqJUYIVaWjj0JEUGtxAixsnTsSYgIaiVGiJWlY09CRFArMUKsLB17EiKCWokRYmXp2JMQEdRKjBArS8eehIigVmKEWFk69iREBLUSI8TK0rEnISKolRghVpaOPQkRQa3ECLGydOxJiAhqJUaIlaVjT0JEUCsxQqwsHXsSIoJaiRFiZenYkxAR1EqMECtLx56EiKBWYoRYWTr2JEQEtRIjxMrSsSchIqiVGCFWlo49CRFBrcQIsbJ07EmICGolRoiVpWNPQkRQKzFCrCwdexIiglqJEWJl6diTEBHUSowQK0vHnoSIoFZihFhZOvYkRAS1EiPEytKxJyEiqJUYIVaWjj0JEUGtxAixsnTsSYgIaiVGiJWlY09CRFArMUKsLB17vu/XAIUOkzS3AAAAAElFTkSuQmCC",
			qrCode: null,
			select: [
				'Logo',
				'Flyers',
				'Instagram Post',
				'Video Thumbnails',
				'Pamphlets',
				'Proposals'
			],
			form: {
				type: 'image',
				prompt: null,
				url: 'https://',
				qr_code_strength: 75,
				model: "v1-5-pruned-emaonly.safetensors [6ce0161689]",
			},
			generate: false,
			qr_code_strength_auto_dir: 1,
			auto_recreate_cycles: 0,
			isGeneratedImages: false,
		}
	},
	computed: {
		typeOfImage() {
			return this.form.type;
		},
		limits() {
			const limits = store.getters.getAccountLimit(this.$route.name + 'Api') || {};
			this.left_count = limits.leftCount ?? null;
			return limits;
		},
		generatedImagesList() {
			return [...this.generatedImages].reverse();
		}
	},
	methods: {
		openImageInNewTab(src) {
			window.open(src);
			// var image = new Image();
			// image.src = src;

			// var w = window.open("");
			// w.document.write(image.outerHTML);
		},
		async checkIsQrCodeReadable(imageUrl) {
			const response = await axios.get(this.API_URL + '/read-qr-code', {
				params: {
					fileurl: imageUrl,
				}
			})


			const result = response.data?.[0]?.symbol?.[0]?.error;

			if (result === null) {
				return true;
			}

			if (result === undefined) {
				return null;
			}

			return false;
		},
		async sendGeneration() {

		},
		async sendTask(initMessage, afterSendData) {
			return new Promise((async r => {
				store.commit('SOCKET_SET_MESSAGE_LISTENER', (message) => {
					if (message.msg === 'send_hash') {
						initMessage();
					}

					if (message.msg === 'send_data') {
						afterSendData();
					}

					if (message.msg === 'process_completed') {
						r();
					}
				});

				await store.dispatch('connectSocket')
			}))
		},
		async sendForm() {
			this.form.prompt = (this.form.prompt || '').trim();
			this.form.url = (this.form.url || '').trim();

			if (!this.form.prompt) {
				return this.$toast.error('Prompt is required!');
			}

			if (this.form.type === 'qr_code' && !this.form.url) {
				return this.$toast.error('Url is required!');
			}

			if (this.form.prompt.length > 75) {
				return this.$toast.error('Prompt must have less than 75 chars!');
			}

			this.sessionHash = (+new Date()).toString();

			if (this.generate) {
				return;
			}

			this.generate = true;

			const image = {
				imageParts: [],
				status: 'created',
			}

			this.imagesGeneration = image;
			this.generatedImages.push(this.imagesGeneration);

			await this.sendTask(
				() => {
					return store.dispatch('emitSocketMessage', {
						"fn_index": 858,
						"session_hash": this.sessionHash
					})
				},
				() => {
					return store.dispatch('emitSocketMessage', {
						"data": [
							this.form.model,
						],
						"event_data": null,
						"fn_index": 858,
						"session_hash": this.sessionHash
					});
				}
			);

			if (this.form.type === 'qr_code') {
				let QRbase64 = await new Promise((resolve, reject) => {
					qrcode.toDataURL(this.form.url, function (err, code) {
						if (err) {
							reject(reject);
							return;
						}
						resolve(code);
					});
				});

				console.log(QRbase64);

				this.qrCode = QRbase64;


				await this.sendTask(
					() => {
						return store.dispatch('emitSocketMessage', {
							"fn_index": 129,
							"session_hash": this.sessionHash
						})
					},
					() => {
						return store.dispatch('emitSocketMessage', {
							"data": [
								null,
								null,
								null,
								false,
								false,
								null,
								true,
								"tile_resample",
								"controlnetQRPatternQR_v2Sd15 [2d8d5750]",
								Math.max(0, Math.min(1.35 * (this.form.qr_code_strength / 70), 2)),
								{
									"image": this.qrCode,
									"mask": this.qrCodeMask
								},
								"Crop and Resize",
								false,
								-1,
								1,
								-1,
								0.21,
								0.88,
								false,
								"Balanced"
							],
							"event_data": null,
							"fn_index": 129,
							"session_hash": this.sessionHash
						});
					}
				);
				this.sendTask(
					() => {
						return store.dispatch('emitSocketMessage', {
							"fn_index": 329,
							"session_hash": this.sessionHash
						})
					},
					() => {
						store.commit('SOCKET_SET_MESSAGE_LISTENER', async (message) => {
							if (message.msg === 'process_completed') {
								console.log(message);
								const finImage = message?.output?.data?.[0]?.[0]?.name;
								if (!finImage && this.auto_recreate_cycles <= 0) {
									this.generate = false;
									return await this.sendForm();
								}

								if (!finImage) {
									this.$toast.error('Error occured, please, try again in a few minutes');
									this.generate = false;

								}
								const url = `https://generate.kaizencloud.net/file=${finImage}`;

								const isReadable = this.form.type === 'qr_code' && this.auto_recreate_cycles <= 0 ? await this.checkIsQrCodeReadable(url) : null;

								if (isReadable === false) {
									if (this.form.qr_code_strength >= 76) {
										this.qr_code_strength_auto_dir = -1;
										this.auto_recreate_cycles += 1
									}
									if (this.form.qr_code_strength <= 68) {
										this.qr_code_strength_auto_dir = 1;
									}
									this.form.qr_code_strength += (this.qr_code_strength_auto_dir) * 1;

									this.generate = false;

									return await this.sendForm();
								}

								this.auto_recreate_cycles = 0;

								this.imagesGeneration.imageParts = [[url]];
								this.imagesGeneration.status = 'completed';

								this.generatedImages = [...this.generatedImages];

								this.isGeneratedImages = true;
								this.generate = false;
							}
						})
						return store.dispatch('emitSocketMessage', {
							data: [
								"task(lt46pq763jsj7jv)",
								this.form.prompt,
								"bad_prompt_version2-neg,badhandv4,(worst quality, low quality:1.3),(inaccurate limb:1.2),(fewer legs),(fewer arms),(extra legs),(extra arms),(cross eyes),bad_pictures,(bad anatomy),(skin blemishes),",
								[],
								20,
								"DPM++ 2M Karras",
								1,
								1,
								7,
								512,
								512,
								false,
								0.7,
								2,
								"Latent",
								0,
								0,
								0,
								"Use same checkpoint",
								"Use same sampler",
								"",
								"",
								[],
								"None",
								false,
								"",
								0.8,
								-1,
								false,
								-1,
								0,
								0,
								0,
								null,
								null,
								null,
								false,
								false,
								"positive",
								"comma",
								0,
								false,
								false,
								"",
								"Seed",
								"",
								[],
								"Nothing",
								"",
								[],
								"Nothing",
								"",
								[],
								true,
								false,
								false,
								false,
								0,
								false,
								null,
								null,
								false,
								null,
								null,
								false,
								null,
								null,
								false,
								50,
								[
								],
								""
							],

							"event_data": null,
							"fn_index": 329,
							"session_hash": this.sessionHash
						})
					}
				);
			} else {
				this.sendTask(
					() => {
						return store.dispatch('emitSocketMessage', {
							"fn_index": 329,
							"session_hash": this.sessionHash
						})
					},
					() => {
						store.commit('SOCKET_SET_MESSAGE_LISTENER', async (message) => {
							if (message.msg === 'process_completed') {
								const finImage = message?.output?.data?.[0]?.[0]?.name;
								if (finImage) {
									const url = `https://generate.kaizencloud.net/file=${finImage}`;

									this.imagesGeneration.imageParts = [[url]];
									this.imagesGeneration.status = 'completed';

									this.generatedImages = [...this.generatedImages];

									this.isGeneratedImages = true;
								}

								this.generate = false;
							}
						})
						return store.dispatch('emitSocketMessage', {
							data: [
								"task(1fytm3dy2rqjuoj)",
								this.form.prompt,
								"bad_prompt_version2-neg,badhandv4,(worst quality, low quality:1.3),(inaccurate limb:1.2),(fewer legs),(fewer arms),(extra legs),(extra arms),(cross eyes),bad_pictures,(bad anatomy),(skin blemishes),",
								[],
								20,
								"DPM++ 2M Karras",
								1,
								1,
								7,
								512,
								512,
								false,
								0.7,
								2,
								"Latent",
								0,
								0,
								0,
								"Use same checkpoint",
								"Use same sampler",
								"",
								"",
								[],
								"None",
								false,
								"",
								0.8,
								-1,
								false,
								-1,
								0,
								0,
								0,
								null,
								null,
								null,
								false,
								false,
								"positive",
								"comma",
								0,
								false,
								false,
								"",
								"Seed",
								"",
								[],
								"Nothing",
								"",
								[],
								"Nothing",
								"",
								[],
								true,
								false,
								false,
								false,
								0,
								false,
								null,
								null,
								false,
								null,
								null,
								false,
								null,
								null,
								false,
								50,
								[
								],
								">"
							],
							"event_data": null,
							"fn_index": 329,
							"session_hash": this.sessionHash
						})
					}
				);
			}
		}
	},
	watch: {
		typeOfImage() {
			this.isGeneratedImages = false;
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
		min-height: 150px;
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

::-webkit-scrollbar {
	-webkit-appearance: none;
}

::-webkit-scrollbar:vertical {
	width: 12px;
}

::-webkit-scrollbar:horizontal {
	height: 12px;
}

::-webkit-scrollbar-thumb {
	background-color: rgba(0, 0, 0, .5);
	border-radius: 8px;
	border: 2px solid #ffffff;
}

::-webkit-scrollbar-track {
	border-radius: 8px;
	background-color: #ffffff;
}

.disclaimer-modal {
	top: 20%;
	position: fixed;
	width: 100%;
	max-height: 90%;
	height: 100vh;

	.modal-content {
		position: relative;
		margin-left: auto;
		margin-right: auto;
		min-width: 350px;
		width: fit-content;

		text-align: left;

		background-color: white;
		padding: 20px;

		border-radius: 20px;

		white-space: pre-wrap;

		max-width: 90%;
		max-height: 70%;

		p {
			margin-bottom: 20px;
		}

		overflow: auto;

		button {
			display: block;
			margin-left: auto;
			margin-right: auto;
			width: 50%;
		}
	}
}
</style>