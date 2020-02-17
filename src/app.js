import createHTMLBranch from './utils/createHTMLBranch'
import radioPage from './pageTypes/radioPageBuilder'
import pageManager from './utils/pageManager'

if(typeof window !== 'undefined') {
	window.createHTMLBranch = createHTMLBranch
	window.radioPage = radioPage
	window.pageManager = pageManager
}


