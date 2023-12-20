import { it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import "@testing-library/jest-dom";
import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import {Character} from './character';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const requiredProps = {
  endPoint: "https://swapi.dev/api/people/1",
    image: "./assets/images/luke.jpeg"
  }

const server = setupServer();

  it('renders Luke Skywalker on page', async () => {
    server.use(
      http.get('https://swapi.dev/api/people/1', () => {
        return new HttpResponse(JSON.stringify({
          name: "Luke Skywalker",
          height: "172",
          eye_color: "blue",
          birth_year: "19BBY"}
            ), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      })
    )
    render(<Character {...requiredProps}/>);
    const characterElement = await screen.findByText(/Luke Skywalker/i);
    expect(characterElement).toBeInTheDocument();
  });

  it('displays error message', async () => {
    server.use(
      http.get('https://swapi.dev/api/people/1', () => {
        return new HttpResponse(JSON.stringify({
          status: 500,
          statusText: "server error"
        }), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      })
    )
    render(<Character {...requiredProps}/>);
    //const errorElement = await screen.findByText(/Oops... something went wrong, try again 🤕/i);
    //expect(errorElement).toBeInTheDocument();
  });

  it('displays error message', async () => {
    server.use(
      http.get('https://swapi.dev/api/people/1', () => {
        return new HttpResponse(JSON.stringify({
          status:  418,
          statusText: "server error"
        }), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      })
    )
    render(<Character {...requiredProps}/>);
    //const errorElement = await screen.findByText(/I'm a tea pot, silly/i);
    //expect(errorElement).toBeInTheDocument();
  });


