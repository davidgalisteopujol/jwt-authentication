const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token:null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				console.log("Aplication just loaded, synching the session storage token ")
				if(token && token != "" && token != undefined)setStore({token:token})
			},

			// logout: () => {
			// 	const token = sessionStorage.removeItem("token");
			// 	console.log("login out")
			// 	setStore({token:null})

			// },

			login: async (email, password) => {
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
		
				var raw = JSON.stringify({
				"email": email,
				"password": password
				});
		
				var requestOptions = {
				method: 'POST',
				headers: myHeaders,
				body: raw,
				redirect: 'follow'
				};
		
				try {
					const resp = await fetch("https://3001-4geeksacade-reactflaskh-7ogjpa9e5yk.ws-eu77.gitpod.io/api/token", requestOptions)
					if (resp.status !== 200){
						alert("There has been some error")
						return false
					}

					const data = await resp.json()
					console.log("esto viene del backend",data)
					sessionStorage.setItem("token",data.access_token)
					setStore({token:data.access_token})
						return true
		
				}catch(error) {
					console.error("There was an error!!!",error)
				}
			},
			
			getMessage: () => {
				const store = getStore();
				const opts = {
					headers: {
						"Authorization": "Bearer "+ store.token
					}
				}
				fetch("https://3001-4geeksacade-reactflaskh-7ogjpa9e5yk.ws-eu77.gitpod.io/api/private",opts)
				.then(resp => resp.json())
				.then(data => setStore({message:data.message}))
				.catch(error => console.log("Error loading message from backend", error))
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
