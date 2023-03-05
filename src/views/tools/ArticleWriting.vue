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

							<form action="#" class="form">
								<div class="form-head">
									<label class="field">
										<div class="text">Topic</div>
										<input type="text" placeholder="Birds">
									</label>

									<label class="field field-select">
										<div class="text">Language</div>
										<select>
											<option value="English">English</option>
											<option value="Ukraine">Ukraine</option>
										</select>
									</label>

									<label class="field field-select">
										<div class="text">Tone of voice</div>
										<select>
											<option value="English">Default</option>
											<option value="Ukraine">Ukraine</option>
										</select>
									</label>

									<input type="submit" value="Generate" class="btn">
								</div>

								<label class="field">
									<textarea></textarea>
								</label>

								<div class="form-foot">
									<button type="submit" class="btn">
										<span>Expand</span>
										<img src="@/assets/icons/ic-size.svg" alt="">
									</button>

									<button type="submit" class="btn">
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

	export default {
		components: {
			Header,
			Footer,
			Sidebar
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