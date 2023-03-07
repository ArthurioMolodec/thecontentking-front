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

								<v-form action="#" method="GET" class="mt-7 form-generate">
									<label class="field field-select">
										<div class="text">Topic</div>
										<textarea placeholder="Birds"></textarea>
									</label>

									<label class="field field-select">
										<div class="text">Use Case</div>
										<select>
											<option>Blog Intro</option>
											<option>Blog Intro 2</option>
											<option>Blog Intro 3</option>
										</select>
									</label>

									<label class="field field-select">
										<div class="text">Language</div>
										<select>
											<option>English</option>
											<option>Ukraine</option>
											<option>Spanish</option>
										</select>
									</label>

									<label class="field field-select">
										<div class="text">Tone of voice</div>
										<select>
											<option>Default</option>
											<option>Tone of voice</option>
											<option>Spanish</option>
										</select>
									</label>

									<label class="field field-select">
										<div class="text">Topic</div>
										<textarea placeholder="Birds"></textarea>
									</label>

									<input type="submit" class="btn" value="Generate">
								</v-form>
							</div>

							<div class="image-results">
								<h3 class="title box mb-3">Results</h3>
								
								<label class="field">
									<textarea></textarea>
								</label>

								<div class="form-foot">
									<button type="submit" class="btn">
										<span>Re-generate</span>
										<img src="@/assets/icons/ic-load.svg" alt="">
									</button>

									<button type="submit" class="btn">
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

	export default {
		components: {
			Header,
			Footer,
			Sidebar
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