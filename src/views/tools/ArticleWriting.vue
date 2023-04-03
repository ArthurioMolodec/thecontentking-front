<template>
	<div class="full-content">
		<div class="bg-image">
			<Header/>

			<div class="content bg">
				<v-container>
					<div class="tools offset-top">
						<Sidebar/>

						<section class="wrap">
							<h3 class="title box mb-3">Article Writing</h3>

							<form ref="form" class="form" @submit.prevent="sendForm">
								<div class="form-head">
									<label class="field">
										<div class="text">Topic</div>
										<input type="text" required v-model="topic" placeholder="Birds">
									</label>

									<label class="field field-select">
										<div class="text">Language</div>
										<select v-model="language">
											<option
												v-for="(option, index) in form.language" 
												:key="index"
												:value="option">
												{{ option }}
											</option>
										</select>
									</label>

									<label class="field field-select">
										<div class="text">Tone of voice</div>
										<select v-model="toneOfVoice">
											<option
												v-for="(option, index) in form.toneOfVoice" 
												:key="index"
												:value="option">
												{{ option }}
											</option>
										</select>
									</label>

									<input type="submit" value="Generate" ref="submit" class="btn">
								</div>

								<label class="field">
									<textarea :value="form.text"></textarea>
								</label>

								<div class="form-foot">
									<button class="btn">
										<span>Expand</span>
										<img src="@/assets/icons/ic-size.svg" alt="">
									</button>

									<button class="btn" :class="{disabled: !this.form.text}" @click="save">
										<span>Save as .txt</span>
										<img src="@/assets/icons/ic-download-2.svg" alt="">
									</button>
								</div>
							</form>
						</section>
					</div>
				</v-container>
			</div>

			<Footer/>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/Header';
	import Footer from '@/components/Footer';
	import Sidebar from '@/components/Sidebar';
	import axios from 'axios'
	const FileSaver = require('file-saver');

	export default {
		components: {
			Header,
			Footer,
			Sidebar
		},
		data() {
			return {
				form: {
					language: [
						'English',
						'Spanish',
						'Chinese',
						'Russian',
						'Korean',
						'Swedish',
						'Italian',
						'German'
					],
					toneOfVoice: [
						'Default',
						'Informative',
						'Convincing',
						'Casual',
						'Worried',
						'Funny',
						'Joyful',
						'Formal',
						'Inspirational'
					],
					text: ''
				},
				topic: '',
				language: 'English',
				toneOfVoice: 'Default',
			}
		},
		methods: {
			async sendForm() {
				this.$refs.submit.classList.add('preloader');
				const url = this.API_URL + '/articleapi';
				let headers = {'Content-Type': 'application/json'}

				let data = {
					topic: this.topic,
					language: this.language,
					toneOfVoice: this.toneOfVoice,
				}

				console.log(data);
				
				try {
				    axios({ url: url, data: data, method: "POST", headers: headers })
				    .then(result => {
				    	this.form.text = result.data.content;
				    	this.$refs.submit.classList.remove('preloader');
				    });
				} catch (error) {
				    console.log(error);
				}
			},
			save() {
				var blob = new Blob([this.form.text], {type: "text/plain;charset=utf-8"});
				FileSaver.saveAs(blob, "form.txt");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.form {
		.form-head {
			display: grid;
			grid-template-columns: 45% repeat(3, 1fr); 
			grid-gap: 6px;
			align-items: flex-end;
			margin-bottom: 20px;

			.btn {height: 58px;}
		}

		textarea {min-height: 550px;}

		.form-foot {
			margin-top: 20px;
			.btn {
				min-width: 225px;
				& + .btn {margin-left: 10px;}
			}
		}

		@media (max-width: 1279px) {
			.form-head {
				grid-template-columns: 1fr;
				.btn {
					margin-top: 24px;
					margin-bottom: 25px;
				}
			}

			textarea {min-height: 250px;}

			.form-foot {
				display: grid;
				grid-template-columns: 1fr 1fr;
				.btn {min-width: inherit;}
			}
		}
	}
</style>