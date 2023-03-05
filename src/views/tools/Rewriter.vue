<template>
	<div class="full-content">
		<div class="bg-image">
			<Header/>

			<div class="content bg">
				<v-container>
					<div class="tools offset-top">
						<Sidebar/>

						<section class="wrap">
							<h3 class="title box mb-3">Rewriter</h3>

							<form action="#" class="form">
								<div>
									<label class="field mt-9">
										<div class="text">Copied Article</div>
										<textarea></textarea>
									</label>

									<input type="submit" class="btn" value="Rewrite">
								</div>
								
								<div>
									<label class="field mt-9">
										<div class="text">Rewritten by AI</div>
										<textarea></textarea>
									</label>

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
	}
</style>