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

							<form action="#" class="form">
								<div class="field field-line">
									<div class="text">Questions</div>
									<div class="row">
										<input type="text" placeholder="Birds">
										<button type="submit" class="btn">Generate</button>
									</div>
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