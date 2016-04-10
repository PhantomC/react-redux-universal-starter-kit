import { renderComponent, expect } from '../helper';
import Article from '../../components/Article';

describe('Article', () => {
    
    let component;

    beforeEach(() => {
        component = renderComponent(Article, {
        	article: {
        		id: 1,
        		title: 'Test Title'
        	}
        });
    });

    it('renders something', () => {
        expect(component).to.exist;
    });
});
