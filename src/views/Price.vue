<template>
	<div class="full-content">
		<div class="bg-image">
			<Header/>

			<div class="content">
				<v-container>
					<h1 class="title">Pricing</h1>

					<div class="pricing">
						<div class="item">
							<div class="cont">
								<h4>Free</h4>
								<p>Prefect to get started</p>
								<h3>Free</h3>
								<strong>Includes:</strong>
								<ul>
                                    <li>15 Images per month</li>
                                    <li>5 Articles per month</li>
                                    <li>3 Biography per month</li>
                                    <li>15 Images per month</li>
                                    <li>5 Article per month</li>
                                    <li>3 Biography per month</li>
								</ul>
							</div>

							<a href="#" class="btn">Get Started</a>
						</div>

						<div class="item">
							<div class="cont">
								<h4>Premium</h4>
								<p>Prefect for personal use</p>
								<h3>$9.99 <span>per month</span></h3>
								<strong>Includes:</strong>
								<ul>
									<li>30 Images per month</li>
									<li>500 Article per month</li>
									<li>3 Biography per month</li>
									<li>15 Images per month</li>
									<li>5 Article per month</li>
									<li>3 Biography per month</li>
								</ul>
							</div>

							<a href="#" class="btn">Get Started</a>
						</div>

						<div class="item">
							<div class="cont">
								<h4>Unlimited</h4>
								<p>Prefect for an enterprise</p>
								<h3>$49 <span>per month</span></h3>
								<strong>Includes:</strong>
								<ul>
									<li>15 Images per month</li>
									<li>5 Article per month</li>
									<li>3 Biography per month</li>
									<li>15 Images per month</li>
									<li>5 Article per month</li>
									<li>3 Biography per month</li>
								</ul>
							</div>

							<a href="#" class="btn">Get Started</a>
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

	export default {
		components: {
			Header,
			Footer
		}
	}
</script>

<style lang="scss" scoped>
	.pricing {
		display: grid;
		grid-template-columns: repeat(3, 320px);
		justify-content: center;
		grid-gap: 30px 65px;
		color: #fff;

		.item {
			padding: 20px;
			background: #2F2F2F;
			border-radius: 12px;
			overflow: hidden;
			text-align: center;
			transition: all 0.3s;
			border: 1px solid transparent;

			.cont {
				max-width: 225px;
				margin: 0 auto 75px auto;
			}

			h4 {
				font-weight: 600;
				font-size: 24px;
				color: var(--colAkcent);
			}
			p {
				color: #fff;
				margin-top: 5px;
			}
			h3 {
				font-weight: 400;
				margin-top: 10px;
				min-height: 100px;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				font-size: 40px;
				line-height: 1.2;
				color: var(--colAkcent);

				span {
					color: #fff;
				}
			}
			strong {
				display: block;
				margin-top: 20px;
				font-weight: 600;
				font-size: 16px;
				text-align: left;
			}

			ul {
				margin-top: 15px;

				li + li {
					margin-top: 13px;
				}

				li {
					position: relative;
					display: flex;
					align-content: center;
					text-align: left;

					&:before {
						content: '';
						width: 21px;
						height: 21px;
						background: url(../assets/icons/ic-check.svg) no-repeat center;
						margin-right: 16px;
					}
				}
			}

			.btn {
				max-width: 225px;
				width: 100%;
			}

			&:hover {
				border-color: var(--colAkcent);
				box-shadow: 5px 10px 10px 5px rgba(0, 0, 0, 0.25);
			}
		}

		@media (max-width: 1200px) {
			grid-template-columns: repeat(3, 1fr);
			grid-gap: 15px;
		}

		@media (max-width: 1200px) {
			grid-template-columns: 1fr;

			.item {
				max-width: 500px;
				width: 100%;
				margin: 0 auto;
			}
		}
	}
</style>