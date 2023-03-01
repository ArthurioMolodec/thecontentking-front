<template>
	<div class="full-content">
		<div class="bg-image">
			<Header/>

			<div class="content bg">
				<v-container>
					<div class="tools offset-top">
						<Sidebar/>

						<section class="wrap">
							<h3 class="title box mb-3">Chat</h3>

							<div class="faq-results mt-8" v-if="questions.length">
								<ul>								
									<li v-for="(question, index) in questions" 
										:key="index"
										:class="question.type">
										<div class="icon" >
											<img src="@/assets/icons/user.svg" alt="" v-if="question.type == 'question'">
											<img src="@/assets/icons/crown.svg" alt="" v-else>
										</div>
										
										<div class="text"><p>{{ question.text }}</p></div>
									</li>
								</ul>
							</div>

							<v-form ref="form" class="faq-generate" @submit.prevent="sendForm">
								<input type="text" v-model="form.text" placeholder="Ask Something">
								<input type="submit" class="btn" value="Generate" ref="submit">
							</v-form>
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
	import axios from 'axios';

	export default {
		components: {
			Header,
			Footer,
			Sidebar
		},
		data() {
			return {
				form: {
					text: null,
				},
				questions: []
			}
		},
		methods: {
			async sendForm() {
				let question = {
					type: 'question',
					text: this.form.text
				}

				this.questions.push(question);
				this.$refs.submit.classList.add('preloader');

				axios.get('https://api.thecontentking.app/apichat', {
					params: {
						prompt: this.form.text
					}
				}).then(result => {
					let question = {
						type: 'answer',
						text: result.data.answer
					}

					this.questions.push(question);
					this.form.text = '';
					this.$refs.submit.classList.remove('preloader');
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.faq-results {
		border: 1px solid #D1A658;
		border-radius: 12px;
		font-size: 16px;
		color: #FFFFFF;

		ul {
			padding: 35px 0;

			li {
				display: flex;
				align-items: flex-start;
				padding: 10px 20px;

				.icon {
					min-width: 55px;
					line-height: 0;
				}

				&:nth-child(odd) {
					background: #2F2F2F;
					.text {padding-top: 5px;}
				}

				&:nth-child(even) {
					padding-top: 20px;
					padding-bottom: 20px;
				}
			}
		}
	}

	.faq-generate {
		border: 1px solid #D1A658;
		border-radius: 12px;
		padding: 5px;
		margin-top: 17px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		input[type="text"] {
			min-height: 40px;
			padding: 0 30px;
			outline: none;
			width: 100%;
			color: rgba(255, 255, 255, 0.5);
			&::placeholder {color: rgba(255, 255, 255, 0.5);}
		}

		.btn {min-width: 110px;}
	}

	@media (max-width: 768px) {
		.wrap {margin-top: 50px;}
	}
</style>