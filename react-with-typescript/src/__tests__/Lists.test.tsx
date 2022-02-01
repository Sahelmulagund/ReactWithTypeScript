import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Lists from "../components/Lists";
import ReactDOM from 'react-dom';
describe('Country Form Test', ()=>{


    
    let container:HTMLDivElement

    beforeEach(()=>{
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(<Lists/>,container);

    })

    afterEach(()=>{
        document.body.removeChild(container);
        container.remove();
    })

    it('Renders correctly initial document', ()=>{
        const inputs = container.querySelectorAll('input');
        expect(inputs).toHaveLength(1);
    })

})