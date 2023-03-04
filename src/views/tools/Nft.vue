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
								<h3 class="title box mb-3">NFT Minter</h3>

								<v-form action="#" method="GET" class="mt-7 form-generate">
									<label class="field field-select">
										<div class="text">Blockchain</div>
										<select>
											<option>ERC-20</option>
											<option>TRC-20</option>
											<option>ERC-2</option>
											<option>Etherium</option>
										</select>
									</label>

									<label class="field field-select">
										<div class="text">Dynamic QR Code?</div>
										<select>
											<option>ERC-20</option>
											<option>TRC-20</option>
											<option>ERC-2</option>
											<option>Etherium</option>
										</select>
									</label>

									<input type="submit" class="btn" value="Mint">

									<label class="field mt-9">
										<div class="text">NFT URL</div>
										<input type="text" placeholder="https://opensea.io/e3bf34bwg">
									</label>

									<label class="field">
										<div class="text">NFT Contract</div>
										<input type="text" placeholder="0x81Ae0bE3A8044772D04F32398bac1E1B4B215aa8">
									</label>
								</v-form>
							</div>

							<div class="image-results">
								<label class="field field-file">
				                    <div class="text">File Upload</div>
				                    <input type="file">
				                    <div class="file">
				                        <div class="button">
				                            <img src="@/assets/icons/ic-download.svg" alt="">
				                            <span>Upload</span>
				                        </div>
				                        <div class="name">Images only.<br> Video’s, 3D models, and files<br> coming soon.</div>
				                    </div>
				                </label>

								<h3 class="title box mt-11">Result</h3>

								<div class="row mt-10">
									<div class="item">
										<div class="image">
											<img src="@/assets/images/image-1.jpeg" alt="">
										</div>
										<div class="group">
											<a href="#" class="link">Upscale</a>
											<a href="#" class="link">Variations</a>
											<a href="#" class="download">
												<img src="@/assets/icons/download.svg" alt="">
											</a>
										</div>
									</div>

									<div class="item">
										<div class="image">
											<img src="@/assets/images/image-2.jpeg" alt="">
										</div>
										<div class="group">
											<a href="#" class="link">Upscale</a>
											<a href="#" class="link">Variations</a>
											<a href="#" class="download">
												<img src="@/assets/icons/download.svg" alt="">
											</a>
										</div>
									</div>
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
		grid-template-columns: max(500px) max(430px);
		grid-gap: 0 50px;

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
	}

	.image-results {
		.row {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
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

			.link + .link {margin-left: 2px;}

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
			.row {grid-template-columns: 1fr;}
		}
	}
</style>