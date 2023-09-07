## About

A simple React application that generates random values every 15 seconds and displays them in a graph and table, along with the time they were generated. The project also includes login and registration with basic form validation.

Generator page:

![Alt text](assets/image.png)

Table:

![Alt text](assets/image-1.png)

## Setup

If you don't have yarn installed you need to execute `npm i -g yarn` before setup:

create .env file inside project root directory and set `VITE_TOKEN=''` variable with your API token

install dependences:

```bash
yarn
```

run application on localhost:

```bash
yarn dev
```

### Deployed app  
you can use these credentials:  

email: asd@asd.com  
passwd: asdasd

or set 'authorized' localstorage variable to 'true'  
(e.g. authorized:	true)

### Libraries

- [React 18](https://reactjs.org/)
- [React Router 6](https://reactrouter.com)
- [tailwindcss 3](https://tailwindcss.com/)
  - [tailwindcss forms plugin](https://tailwindcss-forms.vercel.app/)
- [TypeScript 4.9.5](https://www.typescriptlang.org/)
- [vite 4](https://vitejs.dev/)
- redux
- visx
- react hook form
- zod

