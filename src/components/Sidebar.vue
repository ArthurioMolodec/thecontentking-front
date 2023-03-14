<template>
	<div class="sidebar">
		<h3 class="title box mb-3">Tools</h3>

		<ul>
			<li>
				<router-link active-class="active" to="/image-generator">
					<img src="@/assets/icons/picture.svg" alt="">
					<span>Image Generator</span>
				</router-link>
			</li>
			<li>
				<router-link active-class="active" to="/tools/chat">
					<img src="@/assets/icons/chat.svg" alt="">
					<span>Chat</span>
				</router-link>
			</li>
			<li>
				<router-link active-class="active" to="/tools/long-from-writer">
					<img src="@/assets/icons/pen.svg" alt="">
					<span>Long from writer</span>
				</router-link>
			</li>
			<li>
				<router-link active-class="active" to="/tools/media-text-content">
					<img src="@/assets/icons/remover.svg" alt="">
					<span>Media Text Content</span>
				</router-link>
			</li>
			<li>
				<router-link active-class="active" to="/tools/article-writing">
					<img src="@/assets/icons/document.svg" alt="">
					<span>Article writing</span>
				</router-link>
			</li>
			<li>
				<router-link active-class="active" to="/tools/biography-writer">
					<img src="@/assets/icons/writer.svg" alt="">
					<span>Biography Writer</span>
				</router-link>
			</li>
			<li>
				<router-link active-class="active" to="/tools/rewriter">
					<img src="@/assets/icons/pencil.svg" alt="">
					<span>Rewriter</span>
				</router-link>
			</li>
			<li>
				<router-link active-class="active" to="/tools/summarize">
					<img src="@/assets/icons/moleskine.svg" alt="">
					<span>Summarize</span>
				</router-link>
			</li>
			<li>
				<router-link active-class="active" to="/tools/improve-text">
					<img src="@/assets/icons/note.svg" alt="">
					<span>Improve text</span>
				</router-link>
			</li>
			<li>
				<router-link active-class="active" to="/tools/answers">
					<img src="@/assets/icons/faq.svg" alt="">
					<span>Answers</span>
				</router-link>
			</li>
			<li></li>
			<!-- <li>
				<router-link active-class="active" to="/tools/nft">
					<img src="@/assets/icons/nft.svg" alt="">
					<span>NFT Minter</span>
				</router-link>
			</li>
			<li>
				<router-link active-class="active" to="/tools/history">
					<img src="../assets/icons/ic-history.svg" alt="">
					<span>History</span>
				</router-link>
			</li> -->
		</ul>
	</div>
</template>

<script>
	export default {

	}
</script>

<style lang="scss">
	.sidebar {
		background: #2F2F2F;
		border-radius: 12px;
		padding: 30px 10px;
		color: #fff;

		.box {
			padding-left: 30px;
			padding-right: 30px;
		}

		ul li a {
			display: flex;
			align-content: center;
			padding: 13px 20px;
			font-weight: 400;
			font-size: 14px;
			color: #fff;
			text-decoration: none;
			border-radius: 12px;
			border: 1px solid transparent;

			img {margin-right: 27px;}

			&:hover, &.active {
				background: #242424;
				border-color: #D1A658;
			}
		}

		ul li:last-child {margin-top: 100px;}
	}

	@media (max-width: 768px) {
		.sidebar {display: none;}
		nav .sidebar {
			display: block;

			.box {
				padding-left: 0px;
				padding-right: 0px;
			}

			h3.title {font-size: 30px !important;}

			ul li a {padding: 10px;}
			ul li:last-child {margin-top: 50px;}
		}
	}
</style>