<template>
	<div class="full-content">
		<div class="bg-image">
			<Header/>

			<div class="content bg">
				<v-container>
					<div class="tools offset-top">
						<Sidebar/>

						<div class="pt-8 grid">
							<div class="image-generate">
								<h3 class="title box mb-3">Media Text Content</h3>

								<form ref="form" class="mt-7 form-generate" @submit.prevent>
									<label class="field field-select">
										<div class="text">Topic</div>
										<textarea v-model="description" required></textarea>
									</label>

									<label class="field field-select">
										<div class="text">Use Case</div>
										<select v-model="type">
											<option
												v-for="(option, index) in form.usecase" 
												:key="index"
												:value="option.value">
												{{ option.title }}
											</option>
										</select>
									</label>

									<label class="field field-select">
										<div class="text">Language</div>
										<select v-model="language">
											<option
												v-for="(option, index) in form.language" 
												:key="index"
												:value="option.value">
												{{ option.title }}
											</option>
										</select>
									</label>

									<label class="field field-select">
										<div class="text">Tone of voice</div>
										<select v-model="toneOfVoice">
											<option 
												v-for="(option, index) in form.tonevoice"
												:key="index"
												:value="option.value">
												{{ option.title }}		
											</option>
										</select>
									</label>

									<label class="field field-select">
										<div class="text">Keywords</div>
										<textarea v-model="keywords"></textarea>
									</label>

									<button type="submit" ref="submit" class="btn" @click="sendForm(true)">Generate</button>
								</form>
							</div>

							<div class="image-results">
								<h3 class="title box mb-3">Results</h3>
								
								<label class="field">
									<textarea :value="form.text"></textarea>
								</label>

								<div class="form-foot">
									<button class="btn" :class="{disabled: !this.form.text}" ref="regenerate" @click="sendForm(false)">
										<span>Re-generate</span>
										<img src="@/assets/icons/ic-load.svg" alt="">
									</button>

									<button class="btn" :class="{disabled: !this.form.text}" @click="save">
										<span>Save as .txt</span>
										<img src="@/assets/icons/ic-download-2.svg" alt="">
									</button>
								</div>
							</div>
						</div>
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
					usecase: [
						{
							title: 'Blog Intro',
							value: 'intro'
						},
						{
							title: 'Blog Section',
							value: 'main content'
						},
						{
							title: 'Blog Conclusion',
							value: 'conclusion'
						},
						{
							title: 'Blog Outline',
							value: 'blog outline'
						},
						{
							title: 'Blog Ideas',
							value: 'blog ideas'
						},
						{
							title: 'NLP Terms',
							value: 'nlpterms'
						},
						{
							title: 'SEO Meta Description',
							value: 'seometadesc'
						},
						{
							title: 'SEO Meta Title',
							value: 'seometatitle'
						},
						{
							title: 'Video Ideas',
							value: 'video ideas'
						},
						{
							title: 'Video Description',
							value: 'video desc'
						},
						{
							title: 'Video Channel Description',
							value: 'video channel desc'
						},
						{
							title: 'Answer',
							value: 'answer'
						},
						{
							title: 'email',
							value: 'Email'
						},
						{
							title: 'Profile Bio',
							value: 'bio'
						},
						{
							title: 'AIDA',
							value: 'aida'
						},
						{
							title: 'PAS',
							value: 'pas'
						},
						{
							title: 'Ad',
							value: 'ad'
						},
						{
							title: 'Google Search Ad',
							value: 'google ad'
						},
						{
							title: 'Call to action',
							value: 'call to action'
						},
						{
							title: 'Business Idea Pitch',
							value: 'business idea pitch'
						},
						{
							title: 'Product Review',
							value: 'preview'
						},
						{
							title: 'Product Description',
							value: 'product desc'
						},
						{
							title: 'Job Description',
							value: 'job desc'
						},
						{
							title: 'Interview Questions',
							value: 'interview questions'
						},
						{
							title: 'Notification',
							value: 'notification'
						},
						{
							title: 'Reply to message',
							value: 'reply message'
						},
						{
							title: 'Reply to review',
							value: 'reply review'
						},
						{
							title: 'Expand',
							value: 'completion'
						}
					],
					language: [
						{
							title: 'English',
							value: 'English'
						},
						{
							title: 'Spanish',
							value: 'Spanish'
						},
						{
							title: 'Chinese',
							value: 'Chinese'
						},
						{
							title: 'Russian',
							value: 'Russian'
						},
						{
							title: 'Korean',
							value: 'Korean'
						},
						{
							title: 'Swedish',
							value: 'Swedish'
						},
						{
							title: 'Italian',
							value: 'Italian'
						},
						{
							title: 'German',
							value: 'German'
						}
					],
					tonevoice: [
						{
							title: '👍 Default',
							value: 'default'
						},
						{
							title: '😸 Casual',
							value: 'casual'
						},
						{
							title: '🤩 Excited',
							value: 'excited'
						},
						{
							title: '👔 Formal',
							value: 'formal'
						},
						{
							title: '😡 Angry',
							value: 'angry'
						},
						{
							title: '🤓 Smart',
							value: 'smart'
						},
						{
							title: '😂 Witty',
							value: 'witty'
						},
						{
							title: '😐 Neutral',
							value: 'neutral'
						},
						{
							title: '💨 Urgent',
							value: 'urgent'
						},
						{
							title: '📖 Informative',
							value: 'informative'
						}
					],
					keywords: '',
					text: ''
				},
				description: '',
				keywords: '',
				language: 'English',
				toneOfVoice: 'default',
				type: 'intro',
			}
		},
		methods: {
			async sendForm(flag) {
				if (flag) this.$refs.submit.classList.add('preloader');
				else this.$refs.regenerate.classList.add('preloader');
				
				const url = 'https://api.thecontentking.app/contentapi';
				let headers = {'Content-Type': 'application/json'}

				let data = {
					description: this.description,
					keywords: this.keywords,
					language: this.language,
					toneOfVoice: this.toneOfVoice,
					type: this.type,
					variants: "1"
				}
				
				try {
				    axios({ url: url, data: data, method: "POST", headers: headers })
				    .then(result => {
				    	console.log(result.data);
				    	this.form.text = result.data.content;
				    	if (flag) this.$refs.submit.classList.remove('preloader');
						else this.$refs.regenerate.classList.remove('preloader');
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
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 0 50px;

		@media (max-width: 1279px) {
			grid-template-columns: 1fr;
		}
	}

	.form-generate {
		textarea {
			background: transparent;
			min-height: 100px;
		}

		.btn {
			display: block;
			margin-top: 17px;
			width: 100%;
		}
	}

	.image-results {
		h3.title {margin-bottom: 64px !important;}

		textarea {
			background: transparent;
			min-height: 614px;
		}

		.form-foot {
			margin-top: 17px;
			text-align: center;

			.btn {
				min-width: 250px;
				margin: 0 7px;
			}
		}
	}

	@media (max-width: 1918px) {
		.image-results {
			.form-foot {
				display: grid;
				grid-template-columns: 1fr 1fr;
				grid-gap: 17px 14px;

				.btn {
					min-width: inherit;
					margin: 0;
				}
			}
		}
	}

	@media (max-width: 1279px) {
		.image-results {
			h3.title {margin-bottom: 28px !important;}
			margin-top: 44px;

			textarea {min-height: 300px;}
		}
	}

	@media (max-width: 750px) {
		.image-results {
			.form-foot {
				grid-template-columns: 1fr;
			}
		}
	}
</style>