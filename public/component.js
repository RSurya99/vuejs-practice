const Home = {
    template: `<h1>Home</h1>`
}
const About = {
    template: `<h1>About</h1>`
}
const NotFound = {
    template: `<h1>Halaman Tidak Ditemukan</h1>`
}
const detailKelas = {
    template: `<div>
        <template v-if="detailKelas">
            <img :src="urlGambar(detailKelas.gambar)" width="200px">
            <h3>Judul : {{ detailKelas.judul }}</h3>
            <p>Deskripsi : {{ detailKelas.deskripsi }}</p>
            <router-link to="/kelas">kembali</router-link>
        </template>
        <p v-else>Kelas tidak ditemukan</p>
    </div>`,
    data(){
        return {
            detailKelas: {}
        }
    },
    created(){
        this.filterKelas()
    },
    methods: {
        filterKelas: function(){
            let id = this.$route.params.id
            let KelasDetailRef = database.ref('/kelas/' +id)
            KelasDetailRef.on('value', (item) => {
                this.detailKelas = item.val()
            })
        },
        urlGambar: function(gambar){
            return '../img/' + gambar
        }
    }
}

const Kelas = {
    props: ['items'],
    data: function(){
        return {
            kelas: {
                judul: '',
                deskripsi: '',
                gambar: ''
            },
            previewimg: '',
            error: {
                judul: '',
                deskripsi: ''
            }
        }
    },
    methods: {
        submitkelas: function(){
            this.error.judul = ""
            this.error.deskripsi = ""

            if(this.kelas.judul == ''){
                this.error.judul = 'Judul is required'
            }
            if(this.kelas.deskripsi == ''){
                this.error.deskripsi = 'Deskripsi is required'
            }

            if(this.kelas.judul && this.kelas.deskripsi){
                const data = {
                    id: uuidv4(),
                    judul: this.kelas.judul,
                    deskripsi: this.kelas.deskripsi,
                    gambar: this.kelas.gambar
                }
                this.$emit('submitkelas', data)
                this.kelas.judul = ""
                this.kelas.deskripsi = ""
                this.kelas.gambar = ""
                this.previewimg = ""
                this.$refs.gambar.value = ""
            }
        },
        upload: function(e){
            const namaGambar = e.target.files[0].name
            this.kelas.gambar = namaGambar
            this.previewimg = URL.createObjectURL(e.target.files[0])
        },
        urlGambar: function(gambar){
            return gambar ? 'img/' + gambar : ''
        }
    },
    template:   `
    <div>
        <h3>Form Submit</h3>
        <form v-on:submit.prevent="submitkelas">
            <div class="input-group">
                <input type="text" placeholder="Nama Kelas" v-model="kelas.judul">
                <div class="error" v-if="error.judul">{{ error.judul }}</div>
            </div>
            <div class="input-group">
                <label for="deskripsi">Deskripsi</label><br>
                <textarea name="deskripsi" v-model="kelas.deskripsi"></textarea>
                <div class="error" v-if="error.deskripsi">{{ error.deskripsi }}</div>
            </div>
            <div class="input-group">
                <p><img :src="previewimg" v-if="previewimg" width="200px"></p>
                <label for="img">Masukkan Gambar</label><br>
                <input type="file" ref="gambar" v-on:change="upload">
            </div>
            <button type="submit">Submit</button>
        </form>

        <h3>Daftar Kelas ({{ items.length }})</h3>
        <template v-if="items.length">
            <ul>
                <li v-for="(k, i) in items">
                    <img :src="urlGambar(k.gambar)" width="200px">
                    <p>
                        {{ i+1 }} - {{ k.judul }}
                        <a href="" v-on:click.prevent="$emit('hapuskelas', k.id)">hapus</a>
                        <router-link :to="'/kelas/' + k.id">lihat kelas</router-link>
                    </p>
                </li>
                
            </ul>
        </template>
        <li v-else>Kelas belum tersedia</li>

        <div>
            <label for=""><input type="checkbox" value="React" v-model="items">React</label>
            <label for=""><input type="checkbox" value="Vue" v-model="items">Vue</label>
            <label for=""><input type="checkbox" value="Angular" v-model="items">Angular</label>
        </div>
    </div>`
}

Vue.component('header-component', {
    props: ['nama'],
    data: function(){
        return {
            gambar: 'img/vue.png'
        }
    },
    template: `<header>
                    <img :src="gambar" width="100px" alt="">
                    <p>The Progressive Javascript Framework</p>
                    <h3>Hello, {{ nama }}</h3>
                </header>`
})

Vue.component('footer-component', {
    template: `<footer>
                    <slot></slot>
                </footer>`
})