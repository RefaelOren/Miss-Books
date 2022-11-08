export default {
    template: `
        <header class="app-header">
           <div className="logo">
            <router-link to="/">

                <img  src="img/logo.png" alt="" />
            </router-link>
               <h1>Miss Books</h1>
            </div> 
            <nav>
                <router-link class="nav-link" to="/">Home</router-link>
                <router-link class="nav-link" to="/books">Books</router-link>
                <router-link class="nav-link" to="/about">About</router-link>
            </nav>
        </header>
    `,
    methods: {},
};
