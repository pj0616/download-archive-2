( window.webpackJsonp = window.webpackJsonp || [] ).push( [
  [ 7 ], {
    ese7: function ( e, t, a ) {
      "use strict";
      a.r( t );
      var n = a( "mHbF" ),
        r = a( "my/4" ),
        i = a( "YwZP" ),
        l = a( "Wbzz" ),
        s = a( "q1tI" ),
        c = a.n( s ),
        o = a( "Bl7J" ),
        m = a( "vrFN" ),
        p = a( "18Ly" );
      t.default = function ( e ) {
        var t = i.globalHistory.location.pathname,
          a = p.strMethods.slugToDisplayName( e.pageContext.slug ),
          s = e.pageContext.meta.children,
          u = [];
        return u = ( u = u.concat( s.dirs.map( ( function ( e ) {
          return {
            path: "/" + e.relativePath,
            display: "/" + e.name,
            isDir: !0
          }
        } ) ) ) ).concat( s.md.map( ( function ( e ) {
          return {
            path: e.fields.slug,
            display: e.parent.name,
            isDir: !1
          }
        } ) ) ), c.a.createElement( o.a, {
          slug: e.pageContext.slug
        }, c.a.createElement( m.a, {
          title: "" + e.pageContext.slug
        } ), c.a.createElement( "h1", null, "Generated Index Page - ", "" + a ), c.a.createElement( "div", {
          className: "directoryListingWrapper"
        }, c.a.createElement( "div", {
          className: "directoryListingRow"
        }, c.a.createElement( l.Link, {
          to: t + "/../"
        }, c.a.createElement( n.a, null ), ".. (Go Up a Directory)" ) ), u.map( ( function ( e ) {
          return c.a.createElement( "div", {
            className: "directoryListingRow",
            key: "" + ( e.path + ( new Date ).getTime() )
          }, e.isDir ? c.a.createElement( n.a, null ) : c.a.createElement( r.a, null ), c.a.createElement( l.Link, {
            to: "" + e.path
          }, e.display ) )
        } ) ) ) )
      }
    }
  }
] );
//# sourceMappingURL=component---src-templates-directory-index-js-08c1e6e99eeff9851f1e.js.map
