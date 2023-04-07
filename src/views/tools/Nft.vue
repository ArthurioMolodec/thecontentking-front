<template>
	<div class="full-content">
		<div class="bg-image">
			<Header />

			<div class="content bg">
				<v-container>
					<div class="tools offset-top">
						<Sidebar />

						<div class="pt-8 grid">
							<div class="image-generate">
								<h3 class="title box mb-3">NFT Minter</h3>

								<v-form action="#" method="GET" class="mt-7 form-generate">
									<label class="field field-select">
										<div class="text">Blockchain</div>
										<select v-model="network">
											<option value="BEP20">BEP-20</option>
											<!-- <option value="TRC20">TRC-20</option> -->
										</select>
									</label>

									<!-- <label class="field field-select">
										<div class="text">Dynamic QR Code?</div>
										<select>
											<option>ERC-20</option>
											<option>TRC-20</option>
											<option>ERC-2</option>
											<option>Etherium</option>
										</select>
									</label> -->

									<MintNFT :network="network">
										<template v-slot:mintButton="{ action }">
											<input @click.prevent="() => mintNft(action)" type="submit" class="btn"
												value="Mint">
										</template>
									</MintNFT>

									<div class="mt-9">
										<label v-if="lastTokenLink" class="field mt-9">
											<div class="text">NFT URL</div>
											<input type="text" placeholder="" readonly :value="lastTokenLink">
										</label>

										<label class="field">
											<div class="text">NFT Contract</div>
											<input type="text" placeholder="" readonly :value="contractAddress">
										</label>

									</div>
								</v-form>
							</div>

							<div class="image-results">
								<label class="field field-file">
									<div class="text">File Upload</div>
									<input type="file" ref="imageFile" @change="() => validateFile()">
									<div class="file">
										<div class="button">
											<img src="@/assets/icons/ic-download.svg" alt="">
											<span>Upload</span>
										</div>
										<div class="name">Images only.<br> Video’s, 3D models, and files<br> coming soon.
										</div>
									</div>

									<p style="color: red">
									<p v-for="error in fileErrors">{{ error }}</p>
									</p>
								</label>

								<template v-if="generatedNfts.length">
									<h3 class="title box mt-11">Result</h3>

									<div class="row mt-10">
										<div class="item" v-for="result in generatedNfts">
											<div class="image">
												<img :src="result.image_link" alt="">
											</div>
											<div class="group">
												<a :href="result.image_link" target="_blank" class="link">Upscale</a>
												<!-- <a href="#" class="link">Variations</a> -->
												<a :href="result.image_link" class="download" download="proposed_file_name">
													<img src="@/assets/icons/download.svg" alt="">
												</a>
											</div>
										</div>
									</div>

								</template>

							</div>
						</div>
					</div>
				</v-container>
			</div>

			<Footer />
		</div>
	</div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import MintNFT from '@/components/crypto/MintNFT.vue';
import axios from 'axios';
import store from '@/store';

export default {
	components: {
		Header,
		Footer,
		Sidebar,
		MintNFT
	},

	data() {
		return {
			network: 'BEP20',
			lastTokenLink: null,
			generatedNfts: [],
			fileErrors: []
			// contractAddress: 'Loading...',
		};
	},

	computed: {
		contractAddress() {
			this.lastTokenLink = null;
			return this.CONTRACTS[this.network];
		}
	},

	methods: {
		validateFile() {
			this.fileErrors = [];

			if (!this.$refs.imageFile?.files?.[0]) {
				this.fileErrors.push('Image file is required');
				return false;
			}

			const file = this.$refs.imageFile?.files?.[0];

			const memo = file.type?.split?.('/')?.[0];
			if (memo !== 'image') {
				this.fileErrors.push('File must be image only');
				return false;
			}

			if (file.size > 5 * 1024 * 1024) {
				this.fileErrors.push('File must be less than 5 mb');
				return false;
			}

			return true;
		},
		async mintNft(minter) {
			if (!this.validateFile()) {
				return;
			}

			const limits = store.getters.getAccountLimit(this.$route.name + 'Api');
			if (limits) {
				let text = `${limits.leftCount} of ${limits.totalCount} left`;
				if (limits.leftCount === 0) {
					text += '<br/><b>Upgrade Account</b>';
					const action = 'price';
					window.postMessage({ type: "Toast", data: { type: 'error', text: text, action } })
					return;
				}
			}

			const { tokenId } = await minter();
			const formData = new FormData();

			formData.append("file", this.$refs.imageFile.files[0]);
			formData.append("token_id", tokenId);

			const tokenNet = this.network;

			axios.post(this.API_URL + '/createnftapi', {
				file: this.$refs.imageFile.files[0],
				token_id: tokenId,
				network: tokenNet,
			}, {
				headers: {
					'Content-Type': 'multipart/form-data'
				},
			}).then(result => {
				if (result && result?.data?.status) {
					this.lastTokenLink = this.API_URL + '/nftmetadata/' + tokenNet + '/' + tokenId;
					this.generatedNfts.push({
						image_link: result?.data?.image_link
					})
				}
			});

		}
	},
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

		.link+.link {
			margin-left: 2px;
		}

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
		.row {
			grid-template-columns: 1fr;
		}
	}
}
</style>