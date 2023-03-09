<template>
	<div class="full-content">
		<div class="bg-image">
			<Header/>

			<div class="content bg">
				<v-container>
					<div class="tools offset-top">
						<Sidebar/>

						<section class="wrap">
							<h3 class="title box mb-3">Answers</h3>

							<form ref="form" class="form" @submit.prevent="sendForm">
								<div class="field field-line">
									<div class="text">Questions</div>
									<div class="row">
										<input type="text" required ref="question" placeholder="Birds">
										<button type="submit" ref="submit" class="btn">Generate</button>
									</div>
								</div>

								<label class="field">
									<textarea :value="form.text"></textarea>
								</label>
								
								<div class="form-foot">
									<button type="submit" class="btn">
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
					text: ''
				}
			}
		},
		methods: {
			async sendForm() {
				this.$refs.submit.classList.add('preloader');
				const url = 'https://api.thecontentking.app/answersapi';
				let headers = {'Content-Type': 'application/json'}

				let data = {
					question: this.$refs.question.value
				}
				
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
		textarea {min-height: 555px;}

		.form-foot {
			margin-top: 20px;
			.btn {
				min-width: 225px;
				& + .btn {margin-left: 10px;}
			}
		}

		@media (max-width: 1279px) {
			textarea {min-height: 250px;}

			.form-foot {
				display: grid;
				grid-template-columns: 1fr 1fr;
				.btn {min-width: inherit;}
			}
		}
	}
</style>