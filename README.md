# Team Earth: QA Cinemas

## Key Links

[Jira Board](https://joolsarts.atlassian.net/jira/software/projects/EAR/boards/4)

## Setting up the project

In order to setup this project, you must make sure to have the latest versions of `node` and `npm` installed. A guide to these can be found [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Once these are installed, run the below command fromt the base directory of the project.

```bash
npm i
```

This will install all relevant dependencies into your project within a newly created `node_modules` folder.

Note: `node_modules/` is part of the `.gitignore` file, and should __not__ be forcibly pushed to the repository.

To now run the project, run any one of the following commands depending on your desired environment:

```bash
npm run dev
```

```bash
npm run prod
```

## Important Paths
### Movies

**GET /movie** => Retrieves all movies in order of release date, ascending by default. Add `order` query parameter to change the direction of the order (e.g: `/movie?order=asc` or `/movie?order=desc`), add query parameter `poster`: `/movie?poster=true`. Any other value for `poster` won't work.

**GET /movie/\<movie_id\>** => Retrieve desired movie by id. In order to also return the movie poster, add query parameter `poster`: `/movie/<movie_id>?poster=true`. Any other value for `poster` won't work.

**POST /movie** => Creates a new movie document. An example of this is below.

```json
{
    "name": "Movie 7",
    "genre": "Awesome",
    "synopsis": "Incredible",
    "directors": ["Mr. Fantastic", "Mrs. Brilliant"],
    "actors": ["Wayne Rooney", "Wayne Bruce"],
    "releaseDate": "2019-12-24",
    "runtime": 120,
    "certification": "12"
}
```

**POST /movie/\<movie_id\>/add-poster** => Allows the uploading of a movie image with a selected movie. Takes a body including `img` = actual image, and `name` = image name.

**POST /movie/\<movie_id\>/add-viewing** => Allows the creation of a viewing for a film. An example body is shown below.

```json
{
    "timeAndDate": "2022-05-24 10:00",
    "screenNum": 4,
    "numOfSeats": 30,
    "special": ["IMax", "Accessible", "3D"],
    "pricePerTicket": 11.99
}
```

**PUT /movie/\<movie_id\>** => Update a movie (body matches movie creation)

**GET /movie/find/whats-on** => Gets a list of all movies currently in cinemas. `poster=true` parameter is also available here.

**GET /movie/find/new-release** => films which are not yet out. `poster=true` parameter is available here also.

### Viewings





