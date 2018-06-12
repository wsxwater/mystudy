var React = require("react");
var ReactDOM = require('react-dom');
import { Router, Route, IndexRoute, hashHistory, Link, IndexLink } from './js/ReactRouter';
// import { Router, Route, hashHistory,IndexRoute, Link, IndexLink } from 'react-router';

class Home extends React.Component{
	render(){
		return (
			<div className="tab-pane">
				<h3>望天门山</h3>
				<p>天门中断楚江开，碧水东流至此回。</p>
		        <p>两岸青山相对出，孤帆一片日边来。</p>
			</div>
		)
	}
}

class DuFu extends React.Component{
	render(){
        return (
        	<div className="tab-pane">
                <h3>望岳</h3>
				<p>岱宗夫如何？齐鲁青未了。</p>
				<p>造化钟神秀，阴阳割昏晓。</p>
				<p>荡胸生曾云，决眦入归鸟。</p>
				<p>会当凌绝顶，一览众山小。</p>
        	</div>
        )
	}
}

class LiSY extends React.Component{
	render(){
        return (
        	<div className="tab-pane">
        		<h3>锦瑟</h3>
        		<p>锦瑟无端五十弦，一弦一柱思华年。</p>
                <p>庄生晓梦迷蝴蝶，望帝春心托杜鹃。</p>
                <p>沧海月明珠有泪，蓝田日暖玉生烟。</p>
				<p>此情可待成追忆？只是当时已惘然。</p>
        	</div>
        )
	}
}


class App extends React.Component{
      
    render(){
        return (
        	<div>
        		<div style={{backgroundColor:'#00CC00'}}>
                	<IndexLink to="" activeClassName="active">李白</IndexLink>
                	<Link to="/dufu" activeClassName="active">杜甫</Link>
                	<Link to="/lisy" activeClassName="active">李商隐</Link>
        		</div>

        		<div>{this.props.children}</div>
        	</div>  
        );
    }
                       
}


window.onload=function(){
    ReactDOM.render(
               <Router history={hashHistory}>
               	<Route path="/" component={App}>
               		<IndexRoute path="" component={Home}></IndexRoute>
               		<Route path="/dufu" component={DuFu}></Route>
               		<Route path="/lisy" component={LiSY}></Route>
               	</Route>
               </Router>,  
               document.getElementById('app')
    );
};