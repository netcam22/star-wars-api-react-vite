import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";
import {Character, CharacterProps} from './character';
import "@testing-library/jest-dom";

const validResponse = http.get("https://swapi.dev/api/people", () =>
  HttpResponse.json({
    results: [
      {
        name: "Luke Skywalker",
      },
    ],
  })
);

const errorResponse = http.get("https://swapi.dev/api/people", () => {
  return new HttpResponse(null, {
    status: 500,
    statusText: "Alas the force is not with you",
  });
});

const teaPotResponse = http.get("https://swapi.dev/api/people", () => {
  return new HttpResponse(null, {
    status: 418,
  });
});

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("App", () => {
  test("renders the title", () => {
    const requiredProps = {
      endPoint: "https://swapi.dev/api/people/1",
      image: "./assets/images/luke.jpeg"
    }
  
    render(<Character {...requiredProps}/>);
    const title = screen.getByText(
      "Testing API calls in React with the Star Wars API"
    );
    expect(title).toBeInTheDocument();
  });

  test("fetches the first name from the list", async () => {
    server.use(validResponse);
    const requiredProps = {
      endPoint: "https://swapi.dev/api/people/1",
      image: "./assets/images/luke.jpeg"
    }
  
    render(<Character {...requiredProps}/>);
    const name = await screen.findByText("Luke Skywalker");
    expect(name).toBeInTheDocument();
  });

  test("returns an error message for 500 error", async () => {
    server.use(errorResponse);
    const requiredProps = {
      endPoint: "https://swapi.dev/api/people/1",
      image: "./assets/images/luke.jpeg"
    }
  
    render(<Character {...requiredProps}/>);

    const errorMessage = await screen.findByText(
      "Oops... something went wrong, try again 🤕"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("returns tea pot response for 418 error", async () => {
    server.use(teaPotResponse);
    const requiredProps = {
      endPoint: "https://swapi.dev/api/people/1",
      image: "./assets/images/luke.jpeg"
    }
  
    render(<Character {...requiredProps}/>);

    const errorMessage = await screen.findByText("418 I'm a tea pot 🫖, silly");
    expect(errorMessage).toBeInTheDocument();
  });
});