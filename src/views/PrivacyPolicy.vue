<template>
	<div class="full-content">
		<div class="bg-image">
			<Header/>

			<div class="content">
				<v-container>
					<h1 class="title">Privacy Policy</h1>

					<div class="main-text tx-c">
						<p>Welcome to our website! We are a team of dedicated professionals, with a passion for excellence and a drive to provide the best possible service to our clients. Our mission is to be the leading provider of innovative and high-quality products and services that meet the unique needs and expectations of our customers.</p>

						<p>We have been in business for many years, and have built a reputation for delivering results that exceed our clients' expectations. Our team is made up of experts in various fields, including design, engineering, marketing, and customer service. With a combined wealth of experience, we are able to offer a wide range of products and services that meet the demands of today's marketplace.</p>

						<h2>Our Products and Services</h2>

						<p>Our products and services are designed to meet the needs of businesses of all sizes, and we work with our clients to tailor our offerings to their specific needs. We offer a wide range of solutions, including website design and development, e-commerce solutions, marketing and advertising, and customer support.</p>

						<h2>Website Design and Development</h2>

						<p>Our website design and development services are designed to help businesses of all sizes to create an online presence that is both professional and effective. Our team of experts has extensive experience in creating websites that are both visually appealing and easy to navigate. We work with our clients to understand their unique needs and requirements, and then design a website that meets their specific needs.</p>

						<h2>E-Commerce Solutions</h2>

						<p>We offer a range of e-commerce solutions, including online store design and development, payment processing, and order fulfillment. Our e-commerce solutions are designed to make it easy for businesses to sell their products and services online, and we work with our clients to ensure that their online store is both user-friendly and effective.</p>

						<h2>Marketing and Advertising</h2>

						<p>Our marketing and advertising services are designed to help businesses reach new customers and increase their online visibility. We offer a range of solutions, including search engine optimization (SEO), social media marketing, and email marketing. Our team of experts has extensive experience in these areas, and we work with our clients to develop a marketing and advertising strategy that is tailored to their specific needs.</p>

						<h2>Customer Support</h2>

						<p>We understand that customer support is a critical part of any successful business, and we take this responsibility very seriously. Our customer support team is available 24/7 to answer any questions that our clients may have, and to provide assistance with any issues that may arise. We are committed to providing our clients with the highest level of customer service, and we strive to resolve any issues in a timely and efficient manner.</p>

						<h2>Why Choose Us</h2>

						<p>We believe that our combination of experience, expertise, and commitment to customer satisfaction sets us apart from our competitors. We are passionate about delivering results that exceed our clients' expectations, and we are dedicated to providing the best possible service to our customers. We believe that our clients' success is our success, and we work tirelessly to help them achieve their goals.</p>

						<p>We would love the opportunity to work with you, and we invite you to contact us to learn more about our products and services. Whether you are looking to create a new website, launch an e-commerce store, or develop a marketing and advertising strategy, we are here to help. Thank you for considering us, and we look forward to working with you soon!</p>
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