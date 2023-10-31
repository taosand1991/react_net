import React from 'react';
import { Badge } from 'react-bootstrap';
import { BsCartPlusFill } from 'react-icons/bs';
import { getCartLocal } from '../utils/cartLocal';
import { Link } from 'react-router-dom';

export const AddToCart = () => {
	return (
		<React.Fragment>
			<div className='add-to-cart'>
				<Link to='/cart'>
					<i>
						<Badge bg='danger'>{getCartLocal().length}</Badge>
						<BsCartPlusFill size={40} />
					</i>
				</Link>
			</div>
		</React.Fragment>
	);
};
