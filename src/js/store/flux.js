const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            people: [],
            vehicles: [],
            planets: [],
            favorites: [],
            details: null,
            homeworldName: ''
        },
        actions: {
            loadPeople: async () => {
                try {
                    const res = await fetch("https://www.swapi.tech/api/people");
                    if (!res.ok) {
                        throw new Error(`Application error Status: ${res.status}`);
                    }
                    const data = await res.json();
                    setStore({ people: data.results });
                } catch (error) {
                    console.error('Error loading people:', error);
                }
            },
            loadVehicles: async () => {
                try {
                    const res = await fetch("https://www.swapi.tech/api/vehicles");
                    if (!res.ok) {
                        throw new Error(`Application error Status: ${res.status}`);
                    }
                    const data = await res.json();
                    setStore({ vehicles: data.results });
                } catch (error) {
                    console.error('Error loading vehicles:', error);
                }
            },
            loadPlanets: async () => {
                try {
                    const res = await fetch("https://www.swapi.tech/api/planets");
                    if (!res.ok) {
                        throw new Error(`Application error Status: ${res.status}`);
                    }
                    const data = await res.json();
                    setStore({ planets: data.results });
                } catch (error) {
                    console.error('Error loading planets:', error);
                }
            },
            loadDetails: async (entity, id) => {
                try {
                    const response = await fetch(`https://www.swapi.tech/api/${entity}/${id}`);
                    if (!response.ok) {
                        throw new Error(`Application error Status: ${response.status}`);
                    }
                    const data = await response.json();
                    const details = data.result.properties;

                    if (entity === 'people' && details.homeworld) {
                        const homeworldResponse = await fetch(details.homeworld);
                        if (!homeworldResponse.ok) {
                            throw new Error(`Application error Status: ${homeworldResponse.status}`);
                        }
                        const homeworldData = await homeworldResponse.json();
                        const homeworldName = homeworldData.result.properties.name;
                        setStore({ details, homeworldName });
                    } else {
                        setStore({ details });
                    }
                } catch (error) {
                    console.error(`Error loading details for ${entity} ${id}:`, error);
                }
            },
            addFavorite: (item) => {
                const store = getStore();
                const isAlreadyFavorite = store.favorites.some(fav => fav.uid === item.uid);

                if (!isAlreadyFavorite) {
                    setStore({ favorites: [...store.favorites, { ...item, entity: item.url.split('/')[4] }] });
                }
            },
            removeFavorite: (item) => {
                const store = getStore();
                setStore({ favorites: store.favorites.filter(fav => fav.uid !== item.uid) });
            },
            loadSomeData: () => {
                /**
                    fetch().then().then(data => setStore({ "foo": data.bar }))
                */
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
