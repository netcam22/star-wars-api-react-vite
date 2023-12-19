import {useFetch} from '../hooks/use_fetch';

interface APICallProps {
        endPoint: string;
        image: string;
    }

export interface CharacterProps {
	name: string;
	birth_year: string;
        height: string;
	eye_color: string;
}

export const Character :React.FC<APICallProps> = ({endPoint, image}) =>  {

const response = useFetch<CharacterProps>(endPoint);
	
        return (
        <div className = "card card--planet">
        <h2 className = "card__heading card__heading--darker-blue card__heading--gold-shadow-border">
                {response.data?.name}</h2>
        <img className = "card__image card__image--darker-blue" alt = "Darth Vader holding his fist up" src= 
        {image}></img>
        <p className = "card__text card__text--darker-blue card__text--gold-shadow-border">
                Birth Year: {response.data?.birth_year}</p>
        <p className = "card__text card__text--darker-blue card__text--gold-shadow-border">
                Height: {response.data?.height}</p>
        <p className = "card__text card__text--darker-blue card__text--gold-shadow-border">
                Hair Colour: {response.data?.eye_color}</p>
        </div>
        );
}
