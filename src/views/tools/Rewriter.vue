<template>
	<div class="full-content">
		<div class="bg-image">
			<Header/>

			<div class="content bg">
				<v-container>
					<div class="tools offset-top">
						<Sidebar/>

						<section class="wrap">
							<h3 class="title box">Rewriter</h3>

							<form ref="form" class="form" @submit.prevent="sendForm">
								<div>
									<label class="field mt-9">
										<div class="text">Copied Article</div>
										<textarea v-model="para" required></textarea>
									</label>

									<input type="submit" ref="submit" class="btn" value="Rewrite">
								</div>
								
								<div>
									<label class="field mt-9">
										<div class="text">Rewritten by AI</div>
										<textarea :value="form.text"></textarea>
									</label>

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
				},
				para: ''
			}
		},
		methods: {
			async sendForm() {
				this.$refs.submit.classList.add('preloader');
				const url = this.API_URL + '/rewriterapi';
				let headers = {'Content-Type': 'application/json'}

				let data = {
					para: this.para
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
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 20px;

		textarea {min-height: 555px;}

		.btn {
			min-width: 225px;
			margin-top: 20px;
		}

		@media (max-width: 1279px) {
			grid-template-columns: 1fr;
			textarea {min-height: 250px;}
			.btn {width: 100%;}
		}

		@media (max-width: 750px) {
			textarea {min-height: 200px;}
		}
	}
</style>