// // vue+axios实现登陆拦截（路由拦截、http拦截）
// const routes =[
// {
// 	path:'/',
// 	name:'/',
// 	component:Index
// },
// {
// 	path:'/repository',
// 	name:'repository',
// 	meta:{
// 		requireAuth:true,//添加该字段，表示进入这个路由是需要登陆的
// 	},
// 	component:Repository,

// },
// {
// 	path:'/login',
// 	name:'login',
// 	component:Login
// }
// ]
// //定义完路由后，我们主要利用vue-router提供的钩子函数beforeEach()
// //对路由精选判断
// router.berforeEach((to,from,next)=>{
// 	if(to.meta.requireAuth){//判断该路由是否需要登陆权限
// 		if(store.state.token){//通过vuex state获取当前的token是否存在
// 			next();
// 		}else{
// 			next({
// 				path:'/login',
// 				query:{redirerct:to.fullPath}//将跳转的路由path作为参数，登陆成功后跳转到改路由
// 			})
// 		}
// 	}else{
// 		next()
// 	}
// })
// //每个钩子方法接收三个参数： 
// // * to: Route: 即将要进入的目标 路由对象 
// // * from: Route: 当前导航正要离开的路由 
// // * next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。 
// // * next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。 
// // * next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。 
// // * next(‘/’) 或者 next({ path: ‘/’ }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
// *
//  * 其中，to.meta中是我们自定义的数据，其中就包括我们刚刚定义的requireAuth
//  * 字段。通过这个字段来判断该路由是否需要登陆权限。需要的话，
//  * 同时当前应用不存在token，则跳转到登陆页面，进行登陆。登陆成狗后跳转到目标路由。
//  *
//  *
//  * 登陆拦截到这还没结束。这种方式只是简单的前端路由控制，并
//  * 不是真正阻止用户访问需要登陆权限的路由。还有一种情况便是
//  * 当前token失效，但是token依然保保存在本地。这个时候你访问需要登陆权限的路哟，
//  * 世界上应该让用户重新登陆。
//  * 这个就需要结合http拦截器+后端接口返回的http状态吗来判断。
//  * 
 

// /**
//  * 拦截器
//  *
//  * 要像统一处理所有http请求和响应，就得用上axios的拦截器。
//  * 通过配置http response inteceptor，当后端接口返回401 unauthorized
//  * (未授权)，就让用户重新登陆。
//  * 
//  */
// // http request 拦截器
// anxios.interceptors.request.use(
// 	config=>{
// 		if(store.state.token){//判断是否存在token，则每个存在的话，则每个http header都加上token
// 			config.header.Authorization = `token ${store.state.token}`;

// 		}
// 		return config;
// 	},
// 	err=>{
// 		return Promise.reject(err);
// 	}
// 	)
// //http response 拦截器
// anxios.interceptors.response.use(
// 	response=>{
// 		return response;
// 	},
// 	error=>{
// 		if(error.response){
// 			switch(error.response.status){
// 				case 401:
// 				//返回401清除token信息并跳转到登陆页面
// 				store.commit(types.LOGOUT);
// 				router.replace({
// 					path:'login',
// 					query:{redirerct:router.currentRoute.fullPath}
// 				})
// 			}
// 		}
// 		return Promise.reject(error.response.data)//返回接口的错误信息
// 	}
// 	)