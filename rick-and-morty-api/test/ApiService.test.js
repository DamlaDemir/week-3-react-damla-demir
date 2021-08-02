import axios from "axios";
import {
  getAllChracters,
  getChracter,
  getEpisodesByChracter,
} from "../src/services/ApiService";

jest.mock("axios");

describe("Api Service", () => {
  describe("GetAllChracters Function", () => {
    it("should return all chracters", async () => {
      //arrange
      const responseData = {
        status: 200,
        data: {
          info: {
            pages: 34,
            count: 671,
            next: "https://rickandmortyapi.com/api/character/?page=2",
          },
          results: [
            {
              created: "2017-11-04T22:21:24.481Z",
              episode: ["https://rickandmortyapi.com/api/episode/3"],
              gender: "Female",
              id: 17,
              image: "https://rickandmortyapi.com/api/character/avatar/17.jpeg",
              location: {
                name: "Anatomy Park",
                url: "https://rickandmortyapi.com/api/location/5",
              },
              name: "Annie",
              origin: {
                name: "Earth (C-137)",
                url: "https://rickandmortyapi.com/api/location/1",
              },
              species: "Human",
              status: "Alive",
              type: "",
              url: "https://rickandmortyapi.com/api/character/17",
            },
            {
              created: "2017-11-04T22:25:29.008Z",
              episode: [
                "https://rickandmortyapi.com/api/episode/10",
                "https://rickandmortyapi.com/api/episode/28",
              ],
              gender: "Male",
              id: 18,
              image: "https://rickandmortyapi.com/api/character/avatar/18.jpeg",
              location: {
                name: "Citadel of Ricks",
                url: "https://rickandmortyapi.com/api/location/3",
              },
              name: "Antenna Morty",
              origin: { name: "unknown", url: "" },
              species: "Human",
              status: "Alive",
              type: "Human with antennae",
              url: "https://rickandmortyapi.com/api/character/18",
            },
          ],
        },
      };

      axios.get.mockImplementation(() => {
        return Promise.resolve(responseData);
      });

      //act
      const actualResult = await getAllChracters();

      //assertion
      expect(actualResult.results).toHaveLength(2);
      expect(actualResult.results[0].name).toBe("Annie");
      expect(actualResult.info.pages).toBe(34);
      expect(actualResult.info.count).toBeUndefined();
      expect(actualResult.info.next).toBeUndefined();
    });

    it("should return empty array when status isn't 200 OK", async () => {
      //arrange
      const responseData = {
        status: 404,
        data: {},
      };
      axios.get.mockImplementation(() => {
        return Promise.resolve(responseData);
      });

      //act
      const actualResult = await getAllChracters();

      //assertion
      expect(actualResult.results).toHaveLength(0);
    });

    it("should return error when getAllChracters function throw error", async () => {
      //arrange
      const expectedResult = "Error on get chracter list!";

      axios.get.mockImplementation(() => {
        return Promise.reject(expectedResult);
      });

      //act
      const actualResult = async () => await getAllChracters();

      //assertion
      expect(actualResult).rejects.toThrowError(expectedResult);
    });

    it("should return default object when response data is undefined", async () => {
      //arrange
      const responseData = {
        status: 200,
        data: undefined,
      };

      const expectedResult = {
        info: {
          pages: 0,
        },
        results: [],
      };

      axios.get.mockImplementation(() => {
        return Promise.resolve(responseData);
      });

      //act
      const actualResult = await getAllChracters();

      //assertion
      expect(actualResult).toEqual(expectedResult);
    });

    it("should return default object when response data is null", async () => {
      //arrange
      const responseData = {
        status: 200,
        data: null,
      };

      const expectedResult = {
        info: {
          pages: 0,
        },
        results: [],
      };

      axios.get.mockImplementation(() => {
        return Promise.resolve(responseData);
      });

      //act
      const actualResult = await getAllChracters();

      //assertion
      expect(actualResult).toEqual(expectedResult);
    });

    it("should return default info object when data info is undefined", async () => {
      //arrange
      const responseData = {
        status: 200,
        data: {
          info: undefined,
          results: [
            {
              created: "2017-11-04T22:21:24.481Z",
              episode: ["https://rickandmortyapi.com/api/episode/3"],
              gender: "Female",
              id: 17,
              image: "https://rickandmortyapi.com/api/character/avatar/17.jpeg",
              location: {
                name: "Anatomy Park",
                url: "https://rickandmortyapi.com/api/location/5",
              },
            },
          ],
        },
      };

      const expectedResult = {
        info: {
          pages: 0,
        },
        results: [
          {
            created: "2017-11-04T22:21:24.481Z",
            episode: ["https://rickandmortyapi.com/api/episode/3"],
            gender: "Female",
            id: 17,
            image: "https://rickandmortyapi.com/api/character/avatar/17.jpeg",
            location: {
              name: "Anatomy Park",
              url: "https://rickandmortyapi.com/api/location/5",
            },
          },
        ],
      };

      axios.get.mockImplementation(() => {
        return Promise.resolve(responseData);
      });

      //act
      const actualResult = await getAllChracters();

      //assertion
      expect(actualResult).toEqual(expectedResult);
    });

    it("should return empty array when data result is undefined", async () => {
      //arrange
      const responseData = {
        status: 200,
        data: {
          info: {
            pages: 34,
            count: 671,
            next: "https://rickandmortyapi.com/api/character/?page=2",
          },
          results: undefined,
        },
      };

      const expectedResult = {
        info: {
          pages: 34,
        },
        results: [],
      };

      axios.get.mockImplementation(() => {
        return Promise.resolve(responseData);
      });

      //act
      const actualResult = await getAllChracters();

      //assertion
      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe("GetChracter Function", () => {
    it("should return chracter detail", async () => {
      //arrange
      const responseData = {
        status: 200,
        data: {
          created: "2017-11-04T22:34:53.659Z",
          episode: ["https://rickandmortyapi.com/api/episode/8"],
          gender: "Male",
          id: 20,
          image: "https://rickandmortyapi.com/api/character/avatar/20.jpeg",
          location: {
            name: "Interdimensional Cable",
            url: "https://rickandmortyapi.com/api/location/6",
          },
          name: "Ants in my Eyes Johnson",
          origin: { name: "unknown", url: "" },
          species: "Human",
          status: "unknown",
          type: "Human with ants in his eyes",
          url: "https://rickandmortyapi.com/api/character/20",
        },
      };

      axios.get.mockImplementation(() => {
        return Promise.resolve(responseData);
      });

      //act
      const actualResult = await getChracter(20);

      //assertion
      expect(actualResult.id).toBe(20);
      expect(actualResult.name).toBe("Ants in my Eyes Johnson");
      expect(actualResult.species).toBe("Human");
    });

    it("should return default object when status isn't 200 OK", async () => {
      //arrange
      const responseData = {
        status: 500,
        data: {},
      };
      const expectedResult = {
        episode: [],
        gender: undefined,
        id: undefined,
        image: undefined,
        location: {},
        name: undefined,
        origin: {},
        species: undefined,
        status: undefined,
      };

      axios.get.mockImplementation(() => {
        return Promise.resolve(responseData);
      });

      //act
      const result = await getChracter();

      //assertion
      expect(result).toEqual(expectedResult);
    });

    it("should return default object when response data is undefined", async () => {
      //arrange
      const responseData = {
        status: 200,
        data: undefined,
      };
      const expectedResult = {
        episode: [],
        gender: undefined,
        id: undefined,
        image: undefined,
        location: {},
        name: undefined,
        origin: {},
        species: undefined,
        status: undefined,
      };

      axios.get.mockImplementation(() => {
        return Promise.resolve(responseData);
      });

      //act
      const result = await getChracter();

      //assertion
      expect(result).toEqual(expectedResult);
    });

    it("should return default origin object when response origin is undefined", async () => {
      //arrange
      const responseData = {
        status: 200,
        data: {
          created: "2017-11-04T22:34:53.659Z",
          episode: ["https://rickandmortyapi.com/api/episode/8"],
          gender: "Male",
          id: 20,
          image: "https://rickandmortyapi.com/api/character/avatar/20.jpeg",
          location: {
            name: "Interdimensional Cable",
            url: "https://rickandmortyapi.com/api/location/6",
          },
          name: "Ants in my Eyes Johnson",
          origin: undefined,
          species: "Human",
          status: "unknown",
          type: "Human with ants in his eyes",
          url: "https://rickandmortyapi.com/api/character/20",
        },
      };

      axios.get.mockImplementation(() => {
        return Promise.resolve(responseData);
      });

      //act
      const actualResult = await getChracter(20);

      //assertion
      expect(actualResult.origin).toEqual({});
    });

    it("should return default location object when response location is undefined", async () => {
      //arrange
      const responseData = {
        status: 200,
        data: {
          created: "2017-11-04T22:34:53.659Z",
          episode: ["https://rickandmortyapi.com/api/episode/8"],
          gender: "Male",
          id: 20,
          image: "https://rickandmortyapi.com/api/character/avatar/20.jpeg",
          location: undefined,
          name: "Ants in my Eyes Johnson",
          origin: { name: "unknown", url: "" },
          species: "Human",
          status: "unknown",
          type: "Human with ants in his eyes",
          url: "https://rickandmortyapi.com/api/character/20",
        },
      };

      axios.get.mockImplementation(() => {
        return Promise.resolve(responseData);
      });

      //act
      const actualResult = await getChracter(20);

      //assertion
      expect(actualResult.location).toEqual({});
    });

    it("should return error when getChracter function throw error", async () => {
      //arrange
      const expectedResult = "Error on get chracter detail!";

      axios.get.mockImplementation(() => {
        return Promise.reject(expectedResult);
      });

      //act
      const result = async () => await getChracter();

      //assertion
      expect(result).rejects.toThrowError(expectedResult);
    });
  });

  describe("GetEpisodesByChracter Function", () => {
    it("should return all episodes by chracter", async () => {
      const responseData = {
        status: 200,
        data: {
          air_date: "December 9, 2013",
          created: "2017-11-10T12:56:33.916Z",
          episode: "S01E02",
          id: 2,
          name: "Lawnmower Dog",
          url: "https://rickandmortyapi.com/api/episode/2",
        },
      };
      //arrange
      const episodeEndPoints = [
        "https://rickandmortyapi.com/api/episode/10",
        "https://rickandmortyapi.com/api/episode/28",
      ];

      axios.get.mockImplementation(() => {
        return Promise.resolve(responseData);
      });

      //act
      const actualResult = await getEpisodesByChracter(episodeEndPoints);

      //assertion
      expect(actualResult).toHaveLength(2);
    });

    it("should return error when status isn't 200 OK", async () => {
      //arrange
      const responseData = {
        status: 500,
        data: {},
      };
      const episodeEndPoints = [
        "https://rickandmortyapi.com/api/episode/10",
        "https://rickandmortyapi.com/api/episode/28",
      ];
      const expectedResult = "Error on get episodes!";

      axios.get.mockImplementation(() => {
        return Promise.resolve(responseData);
      });

      //act
      const actualResult = async () =>
        await getEpisodesByChracter(episodeEndPoints);

      //assertion
      expect(actualResult).rejects.toThrowError(expectedResult);
    });

    it("should return error when getEpisodesByChracter function throw error", async () => {
      //arrange
      const episodeEndPoints = [
        "https://rickandmortyapi.com/api/episode/10",
        "https://rickandmortyapi.com/api/episode/28",
      ];

      const expectedResult = "Error on get episodes!";

      axios.get.mockImplementation(() => {
        return Promise.reject(expectedResult);
      });

      //act
      const actualResult = async () =>
        await getEpisodesByChracter(episodeEndPoints);

      //assertion
      expect(actualResult).rejects.toThrowError(expectedResult);
    });

    it("should return default object when data is undefined", async () => {
      //arrange
      const responseData = {
        status: 200,
        data: undefined,
      };
      const episodeEndPoints = [
        "https://rickandmortyapi.com/api/episode/10",
        "https://rickandmortyapi.com/api/episode/28",
      ];
      const expectedResult = [
        { air_date: undefined, episode: undefined, name: undefined },
        { air_date: undefined, episode: undefined, name: undefined },
      ];

      axios.get.mockImplementation(() => {
        return Promise.resolve(responseData);
      });

      //act
      const actualResult = await getEpisodesByChracter(episodeEndPoints);

      //assertion
      expect(actualResult).toEqual(expectedResult);
    });
  });
});
