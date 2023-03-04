<template>
	<div class="full-content">
		<div class="bg-image">
			<Header/>

			<div class="content bg">
				<v-container>
					<div class="tools offset-top">
						<Sidebar/>

						<section class="wrap">
							<h3 class="title box mb-3">History</h3>

							<div class="history">
								<div class="item">
									<div class="left">
										<img src="@/assets/icons/picture.svg" alt="">
										<span>Image Generator</span>
									</div>

									<div class="cont">
										<div>
											<span class="label">Image</span>
										</div>
										<h2>Bird, colorful, realistic, high detailed</h2>
										<div class="date">12.12.2023 - 2.30PM</div>
									</div>
								</div>

								<div class="item">
									<div class="left">
										<img src="@/assets/icons/chat.svg" alt="">
										<span>Chat</span>
									</div>

									<div class="cont">
										<h2>What is Ai chat bot?</h2>
										<h2>write a biography of Stephen hawking</h2>
										<div class="date">12.12.2023 - 2.30PM</div>
									</div>
								</div>

								<div class="item">
									<div class="left">
										<img src="@/assets/icons/pen.svg" alt="">
										<span>Long from writer</span>
									</div>

									<div class="cont">
										<div>
											<span class="label">Web design</span>
											<span class="label">English</span>
											<span class="label">Default</span>
										</div>
										<h2>Write a paragraph about Web design</h2>
										<div class="date">12.12.2023 - 2.30PM</div>
									</div>
								</div>

								<div class="item">
									<div class="left">
										<img src="@/assets/icons/remover.svg" alt="">
										<span>Media Text Content</span>
									</div>

									<div class="cont">
										<div>
											<span class="label">Web design</span>
											<span class="label">English</span>
											<span class="label">Default</span>
										</div>
										
										<h2>Write a paragraph about Web design</h2>
										<div class="date">12.12.2023 - 2.30PM</div>
									</div>
								</div>

								<div class="item">
									<div class="left">
										<img src="@/assets/icons/document.svg" alt="">
										<span>Article writing</span>
									</div>

									<div class="cont">
										<div>
											<span class="label">Web design</span>
											<span class="label">English</span>
											<span class="label">Default</span>
										</div>
										
										<h2>Write a paragraph about Web design</h2>
										<div class="date">12.12.2023 - 2.30PM</div>
									</div>
								</div>

								<div class="item">
									<div class="left">
										<img src="@/assets/icons/writer.svg" alt="">
										<span>Biography Writer</span>
									</div>

									<div class="cont">
										<h2>Isaac Newton</h2>
										<div class="date">12.12.2023 - 2.30PM</div>
									</div>
								</div>

								<div class="item">
									<div class="left">
										<img src="@/assets/icons/pencil.svg" alt="">
										<span>Rewriter</span>
									</div>

									<div class="cont">
										<h2>Write a paragraph about Web design</h2>
										<div class="date">12.12.2023 - 2.30PM</div>
									</div>
								</div>
							</div>
						</section>
					</div>
				</v-container>
			</div>
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
	.history {
		border: 1px solid var(--colAkcent);
		border-radius: 12px;
		margin-top: 30px;
		padding: 24px 13px;

		.item {
			padding: 8px 15px;
			background: #2F2F2F;
			border: 1px solid #606060;
			border-radius: 12px;
			display: grid;
			grid-template-columns: 200px 1fr;
			align-items: flex-start;
			position: relative;
			min-height: 75px;
			transition: all 0.3s;
			border: 1px solid transparent;

			&:hover {border-color: var(--colAkcent);}
			& + .item {margin-top: 10px;}

			.left {
				display: flex;
				align-items: center;
				padding-right: 10px;

				img {
					display: block;
					max-width: 25px;
					margin-right: 13px;
				}

				span {
					color: #fff;
					font-size: 14px;
				}
			}

			.cont {
				border-left: 2px solid #FFFFFF;
				padding-left: 20px;
				color: #fff;
				height: 100%;

				& > div {margin-bottom: 7px;}

				.label {
					display: inline-block;
					font-size: 12px;
					color: #fff;
					background: #242424;
					border-radius: 5px;
					padding: 4px 10px;
					margin-right: 8px;
				}

				h2 {
					font-weight: 400;
					font-size: 16px;

					& + h2 {margin-top: 5px;}
				}

				.date {
					position: absolute;
					top: 10px;
					right: 10px;
					font-size: 12px;
				}
			}
		}

		@media (max-width: 1279px) {
			.item {
				grid-template-columns: 1fr;

				.left {
					justify-content: flex-start;

					img {margin-right: 5px;}
				}

				.cont {
					border-top: 1px solid #595757;
					padding-top: 15px;
					margin-top: 10px;
					border-left: none;
					padding-left: 0;

					.date {
						top: 13px;
						right: 15px;
					}
				}
			}
		}

		@media (max-width: 750px) {
			.item {
				.left {
					span {font-size: 13px;}
				}

				.cont {
					.date {font-size: 11px;}
				}
			}
		}
	}
</style>

