<template>
	<div class="full-content">
		<div class="bg-image">
			<Header />

			<div class="content bg">
				<v-container>
					<div class="tools offset-top">
						<Sidebar />

						<div class="pt-8 grid" style="width: 100%;height: 100%;min-height: 700px;">

							<iframe style="height: 100%;width: 100%;" src="http://invoke.kaizencloud.net"></iframe>
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
export default {
	components: {
		Header,
		Footer,
		Sidebar
	},
}
</script>