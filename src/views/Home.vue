<template>
  <div class="full-content">
    <div class="bg-image">
      <Header/>
      <div class="content">
        <v-container>
          <section class="mb-16 v-col-md-7 v-col-12">
            <h1 class="pa-0 text-start title mb-3">
              AI Content Creation Tool
            </h1>
            <p class="text-white">
              AI Content Creation tools are software applications that use artificial intelligence
              algorithms to generate written or multimedia content automatically. These tools
              can be trained to produce content in a specific style or tone and can be used for
              a variety of purposes such as creating articles, blog posts, product descriptions,
              social media updates, and more.
            </p>
            <router-link to="/register" rounded="xl" text v-text="'Get started'" class="get-started"></router-link>
          </section>
          <section class="mb-16 v-col-12">
            <h2 class="main-title">
              AI Tools
            </h2>
            <div class="align-center v-row mt-12">
              <div class="v-col-12 v-col-md-6">
                <h3 class="mb-6 section-title">AI Image Generator</h3>
                <p class="text-white">
                  AI Content Creation tools are software applications that use artificial intelligence
                  algorithms to generate written or multimedia content automatically. These tools
                  can be trained to produce content in a specific style or tone and can be used for
                  a variety of purposes such as creating articles, blog posts, product descriptions,
                  social media updates, and more.
                </p>
                <router-link to="/image-generator" rounded="xl" text v-text="'Image Generator'" class="get-started"></router-link>
              </div>
              <div class="v-col-12 v-col-md-6">
                <div class="justify-lg-space-evenly v-row">
                  <img src="../assets/images/ai-tools1.png" height="200" class="v-col-md-6 v-col-12" />
                  <img src="../assets/images/ai-tools2.png" height="200" class="v-col-md-6 v-col-12" />
                  <img src="../assets/images/ai-tools3.png" height="200" class="v-col-md-6 v-col-12" />
                  <img src="../assets/images/ai-tools4.png" height="200" class="v-col-md-6 v-col-12" />
                </div>
              </div>
            </div>
            <div class="align-center v-row mt-12">
              <div class="v-col-12 v-col-md-6">
                <div class="justify-lg-space-evenly v-row">
                  <img src="../assets/images/ai-chat-bot.png" height="418" class="w-100 mb-4"/>
                </div>
              </div>
              <div class="v-col-12 v-col-md-6 text-end">
                <h3 class="mb-6 section-title">AI Chat Bot</h3>
                <p class="text-white">
                  AI Content Creation tools are software applications that use artificial intelligence
                  algorithms to generate written or multimedia content automatically. These tools
                  can be trained to produce content in a specific style or tone and can be used for
                  a variety of purposes such as creating articles, blog posts, product descriptions,
                  social media updates, and more.
                </p>
                <router-link to="/tools/chat" rounded="xl" text v-text="'Chat Bot'" class="get-started"></router-link>
              </div>
            </div>
            <div class="align-center v-row mt-12">
              <div class="v-col-12 v-col-md-6">
                <h3 class="mb-6 section-title">AI Biography Writer</h3>
                <p class="text-white">
                  AI Content Creation tools are software applications that use artificial intelligence
                  algorithms to generate written or multimedia content automatically. These tools
                  can be trained to produce content in a specific style or tone and can be used for
                  a variety of purposes such as creating articles, blog posts, product descriptions,
                  social media updates, and more.
                </p>
                <router-link to="/tools/biography-writer" rounded="xl" text v-text="'Biography Writer'" class="get-started"></router-link>
              </div>
              <div class="v-col-12 v-col-md-6">
                <div class="border border-primary pb-16 rounded-12">
                  <div class="bg-2F2F2F mb-3">
                    <div class="align-center d-flex mt-6 px-7 py-2">
                      <img src="../assets/images/user.svg" class="mr-6"/>
                      <span class="text-white">Write a biography of Stephen hawking</span>
                    </div>
                  </div>
                  <div class="d-flex align-start px-6">
                    <p class="text-center text-white">
                      Stephen Hawking was an English theoretical physicist,
                      cosmologist, and author born on January 8, 1942, in Oxford,
                      England. He was known for his groundbreaking work
                      on black holes and the origins of the universe. Despite
                      being diagnosed with a form of motor neuron disease
                      at the age of 21 and being given only a few years to live,
                      he went on to become one of the most famous scientists
                      of the 20th century. He wrote numerous popular science
                      books, including "A Brief History of Time," which became
                      an international bestseller. Hawking passed away on
                      March 14, 2018, at the age of 76, leaving behind a legacy
                      as one of the greatest minds in the field of physics.
                    </p>
                    <img src="../assets/logo-small.svg" class="logo">
                  </div>
                </div>
              </div>
            </div>
            <div v-if="showMore">
              <div class="align-center v-row mt-12">
                <div class="v-col-12 v-col-md-6">
                  <h3 class="mb-6 section-title">Long from Writer</h3>
                  <p class="text-white">
                    AI Content Creation tools are software applications that use artificial intelligence
                    algorithms to generate written or multimedia content automatically. These tools
                    can be trained to produce content in a specific style or tone and can be used for
                    a variety of purposes such as creating articles, blog posts, product descriptions,
                    social media updates, and more.
                  </p>
                  <router-link to="/tools/long-from-writer" rounded="xl" text v-text="'Long From Writer'" class="get-started"></router-link>
                </div>
                <div class="v-col-12 v-col-md-6">
                  <div class="justify-lg-space-evenly v-row">
                    <img src="../assets/images/longfromwriter.png"  class="w-100 mb-4"/>
                  </div>
                </div>
              </div>
              <div class="align-center v-row mt-12">
                <div class="v-col-12 v-col-md-6">
                  <div class="justify-lg-space-evenly v-row">
                    <img src="../assets/images/longfromwriter.png"  class="w-100 mb-4"/>
                  </div>
                </div>
                <div class="v-col-12 v-col-md-6 text-end">
                  <h3 class="mb-6 section-title">Media Text Content</h3>
                  <p class="text-white">
                    AI Content Creation tools are software applications that use artificial intelligence
                    algorithms to generate written or multimedia content automatically. These tools
                    can be trained to produce content in a specific style or tone and can be used for
                    a variety of purposes such as creating articles, blog posts, product descriptions,
                    social media updates, and more.
                  </p>
                  <router-link to="/tools/media-text-content" rounded="xl" text v-text="'Media Text Content'" class="get-started"></router-link>
                </div>
              </div>

              <div class="align-center v-row mt-12">
                <div class="v-col-12 v-col-md-6">
                  <h3 class="mb-6 section-title">Article Writer</h3>
                  <p class="text-white">
                    AI Content Creation tools are software applications that use artificial intelligence
                    algorithms to generate written or multimedia content automatically. These tools
                    can be trained to produce content in a specific style or tone and can be used for
                    a variety of purposes such as creating articles, blog posts, product descriptions,
                    social media updates, and more.
                  </p>
                  <router-link to="/tools/article-writing" rounded="xl" text v-text="'Article Writer'" class="get-started"></router-link>
                </div>
                <div class="v-col-12 v-col-md-6">
                  <div class="justify-lg-space-evenly v-row">
                    <img src="../assets/images/articlewriter.png"  class="w-100 mb-4"/>
                  </div>
                </div>
              </div>
              <div class="align-center v-row mt-12">
                <div class="v-col-12 v-col-md-6">
                  <div class="justify-lg-space-evenly v-row">
                    <img src="../assets/images/biography.png"  class="w-100 mb-4"/>
                  </div>
                </div>
                <div class="v-col-12 v-col-md-6 text-end">
                  <h3 class="mb-6 section-title">Biography Writer</h3>
                  <p class="text-white">
                    AI Content Creation tools are software applications that use artificial intelligence
                    algorithms to generate written or multimedia content automatically. These tools
                    can be trained to produce content in a specific style or tone and can be used for
                    a variety of purposes such as creating articles, blog posts, product descriptions,
                    social media updates, and more.
                  </p>
                  <router-link to="/tools/biography-writer" rounded="xl" text v-text="'Biography Writer'" class="get-started"></router-link>
                </div>
              </div>

              <div class="align-center v-row mt-12">
                <div class="v-col-12 v-col-md-6">
                  <h3 class="mb-6 section-title">Rewriter</h3>
                  <p class="text-white">
                    AI Content Creation tools are software applications that use artificial intelligence
                    algorithms to generate written or multimedia content automatically. These tools
                    can be trained to produce content in a specific style or tone and can be used for
                    a variety of purposes such as creating articles, blog posts, product descriptions,
                    social media updates, and more.
                  </p>
                  <router-link to="/tools/rewriter" rounded="xl" text v-text="'Rewriter'" class="get-started"></router-link>
                </div>
                <div class="v-col-12 v-col-md-6">
                  <div class="justify-lg-space-evenly v-row">
                    <img src="../assets/images/rewriter.png"  class="w-100 mb-4"/>
                  </div>
                </div>
              </div>
              <div class="align-center v-row mt-12">
                <div class="v-col-12 v-col-md-6">
                  <div class="justify-lg-space-evenly v-row">
                    <img src="../assets/images/improved.png"  class="w-100 mb-4"/>
                  </div>
                </div>
                <div class="v-col-12 v-col-md-6 text-end">
                  <h3 class="mb-6 section-title">Improved Text</h3>
                  <p class="text-white">
                    AI Content Creation tools are software applications that use artificial intelligence
                    algorithms to generate written or multimedia content automatically. These tools
                    can be trained to produce content in a specific style or tone and can be used for
                    a variety of purposes such as creating articles, blog posts, product descriptions,
                    social media updates, and more.
                  </p>
                  <router-link to="/tools/improve-text" rounded="xl" text v-text="'Improved Text'" class="get-started"></router-link>
                </div>
              </div>


              <div class="align-center v-row mt-12">
                <div class="v-col-12 v-col-md-6">
                  <h3 class="mb-6 section-title">Answers</h3>
                  <p class="text-white">
                    AI Content Creation tools are software applications that use artificial intelligence
                    algorithms to generate written or multimedia content automatically. These tools
                    can be trained to produce content in a specific style or tone and can be used for
                    a variety of purposes such as creating articles, blog posts, product descriptions,
                    social media updates, and more.
                  </p>
                  <router-link to="/tools/answers" rounded="xl" text v-text="'Answers'" class="get-started"></router-link>
                </div>
                <div class="v-col-12 v-col-md-6">
                  <div class="justify-lg-space-evenly v-row">
                    <img src="../assets/images/answers.png"  class="w-100 mb-4"/>
                  </div>
                </div>
              </div>
              <div class="align-center v-row mt-12">
                <div class="v-col-12 v-col-md-6">
                  <div class="justify-lg-space-evenly v-row">
                    <img src="../assets/images/nftMinter.png"  class="w-100 mb-4"/>
                  </div>
                </div>
                <div class="v-col-12 v-col-md-6">
                  <h3 class="mb-6 section-title text-end">NFT Minter</h3>
                  <p class="text-white">
                    AI Content Creation tools are software applications that use artificial intelligence
                    algorithms to generate written or multimedia content automatically. These tools
                    can be trained to produce content in a specific style or tone and can be used for
                    a variety of purposes such as creating articles, blog posts, product descriptions,
                    social media updates, and more.
                  </p>
                  <router-link to="/tools/nft" rounded="xl" text v-text="'NFT Minter'" class="get-started"></router-link>
                </div>
              </div>
            </div>
          </section>
          <div class="show-more" @click="show(!showMore)">
            {{!showMore ? 'Show More' : 'Show Less'}}
          </div>
          <Subscribe />
        </v-container>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from '../components/Header';
import Footer from '../components/Footer';
import Subscribe from "@/components/Subscribe";
export default {
  components: {
    Subscribe,
    Header,
    Footer,
  },
  data() {
    return {
      showMore: false,
    }
  },
  methods: {
    show(show) {
      this.showMore = show;
    }

  }
}
</script>

<style scoped>
.bg-image {
  background-image: url('../assets/home-bg.svg');
  background-position-x: right !important;
}
.border-primary {
  border-color: #D1A658 !important;
}
.rounded-12 {
  border-radius: 12px;
}
.bg-2F2F2F {
  background: #2F2F2F;
}
.get-started {
  padding: 13px 70px 13px 70px;
  min-height: 45px;
  margin-top: 39px;
  display: inline-block;
  background-color: #D1A658;
  text-transform: none;
  font-size: 16px;
  color: black;
  margin-left: 10px;
  text-decoration: none;
  border-radius: 71px;
}
.main-title {
  font-size: 64px;
  font-style: normal;
  color: #FFFFFF;
  text-align: center;
  margin-bottom: 100px;
  margin-top: 0;
}
.section-title {
  font-size: 40px;
  font-style: normal;
  color: #FFFFFF;
}
.show-more {
  margin-bottom: 122px;
  color: #D1A658;
  text-align: center;
  cursor: pointer;
}
</style>
