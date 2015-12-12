import React from 'react';
import { render } from 'react-dom';
import Router from './ui/router';

const container = document.createElement('div');
container.style.width = '100%';
container.style.height = '100%';

document.body.appendChild(container);

render(<Router />, container);
