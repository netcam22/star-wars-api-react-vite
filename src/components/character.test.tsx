import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import "@testing-library/jest-dom";
import { render, screen } from '@testing-library/react';
import { http } from "msw";
import { setupServer } from "msw/node";
import {Character} from './character';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const server = setupServer(

  http.get('https://swapi.dev/api/people/1', () => {
    return new Response(JSON.stringify({
      "name": "Luke Skywalker",
      "height": "172",
      "eye_color": "blue",
      "birth_year": "19BBY"}
        ), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  ))
  
  const requiredProps = {
    endPoint: "https://swapi.dev/api/people/1",
      image: "./assets/images/luke.jpeg"
    }

  it('renders Luke Skywalker on page', async () => {
    render(<Character {...requiredProps}/>);
    const characterElement = await screen.findByText(/Luke Skywalker/i);
    expect(characterElement).toBeInTheDocument();
  });

  