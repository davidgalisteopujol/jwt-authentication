export const signup = async (user, pass) => {
    const response = await fetch(
        "https://3001-4geeksacade-reactflaskh-7ogjpa9e5yk.ws-eu77.gitpod.io/api/signup",
        {
            method: "POST",
            body: JSON. stringify({email: user, password: pass })
        }
        );

    if(response.status === 201) {
        return "User registered"
    }

    throw new Error(`Couldnt register user. Status: ${response.status}`)
};