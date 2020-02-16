import createHTMLBranch from './utils/createHTMLBranch'
import radioPage from './pageTypes/radio-page'
import pageManager from './utils/pageManager'

if(typeof window !== 'undefined') {
	window.createHTMLBranch = createHTMLBranch
	window.radioPage = radioPage
	window.pageManager = pageManager
}


