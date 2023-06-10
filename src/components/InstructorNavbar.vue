<template>
    <nav id="nav">
      <img src="@/assets/a.png">
      <div class="nav-links" id="navlinks">
        <i class="fa fa-times" onclick="hidemenu()"></i>
        <ul>
          <router-link :to="{ path: '/instructor/home' }">
            <li>
              <span>HOME</span>
            </li>
          </router-link>
          <router-link :to="{ path: '/paths' }">
            <li>
              <span>PATHS</span>
            </li>
          </router-link>
          <router-link :to="{ path: '/instructor/challenges' }">
            <li>
              <span>MY CHALLENGES</span>
            </li>
          </router-link>
          <router-link :to="{ path: '/developer/challenges' }">
            <li>
            <span>CHALLENGES</span>
            </li>
          </router-link>
          <router-link :to="{ name: 'Login' }">
            <li href="Login" @click="logout()">
              <span>LOGOUT</span>
            </li>
          </router-link>
        </ul>
      </div>
      <i class="fa fa-bars" onclick="showmenu()"></i>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'DeveloperNavbar',
    methods: {
      logout() {
        sessionStorage.removeItem('account');
        this.$store.state.account = {
          "id": null,
          "email": null,
          "username": null,
          "role": null,
          "is_verified": null,
          "image": null,
          "skills": null
        };
        this.$router.push('/login');
      },
    }
  }
  </script>
  
  <style scoped>
  #nav {
    width: 100%;
    /*background: linear-gradient(#2980b9, 80%, transparent);*/
  }
  
  nav {
    display: flex;
    padding: 0.9%;
    justify-content: space-between;
    align-items: center;
  }
  
  nav img {
    margin-top: 1px;
    width: 200px;
    cursor: pointer;
  }
  
  .nav-links {
    flex: 1;
    text-align: right;
    font-size: x-small;
    cursor: pointer;
    transition: 0.6s;
    margin-top: -40px;
  }
  
  .nav-links ul a li {
    list-style: none;
    display: inline-block;
    padding: 20px 25px;
    position: relative;
  }
  
  .nav-links ul  a {
    color: #fff;
    text-decoration: none;
    font-size: 17px;
  }
  
  .nav-links ul li::after {
    content: '';
    width: 0%;
    height: 2px;
    background: #5FCBE1;
    display: block;
    margin: auto;
    transition: 0.5s;
  }
  
  .nav-links ul li:hover::after {
    width: 100%;
  }
  
  nav .fa {
    display: none;
  }
  
  @media (max-width: 700px) {
    .nav-links ul li {
      display: block;
    }
  
    .nav-links {
      position: absolute;
      background: #5fcbe198;
      height: 100vh;
      width: 200px;
      top: 0;
      right: -200px;
      text-align: left;
      z-index: 2;
      transition: 1s;
    }
  
    nav .fa {
      display: block;
      color: #fff;
      margin: 10px;
      font-size: 22px;
      cursor: pointer;
    }
  
    .nav-links ul {
      padding: 20px;
    }
  }
  
  </style>
  