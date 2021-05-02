( window.webpackJsonp = window.webpackJsonp || [] ).push( [
  [ 8 ], {
    Zidi: function ( e, a, t ) {
      "use strict";
      t.r( a );
      var n = t( "q1tI" ),
        d = t.n( n ),
        l = t( "Bl7J" ),
        r = t( "vrFN" ),
        i = t( "18Ly" );
      a.default = function ( e ) {
        var a = e.data.markdownRemark,
          t = "string" == typeof e.pageContext.modifiedHtml ? e.pageContext.modifiedHtml : a.html;
        "undefined" != typeof window && Object( i.getIsDebug )() && ( window.debugData = "object" == typeof window.debugData ? window.debugData : {}, window.debugData.mdData = a, window.debugData.props = e );
        var n = a.fields,
          o = n.title,
          m = n.slug,
          s = n.modifiedStampMs,
          c = n.createdStampMs,
          w = a.frontmatter.description;
        w = "string" == typeof w && w.length > 0 ? w : null;
        var u = d.a.createElement( "div", {
          className: "metaInfoWrapper"
        }, d.a.createElement( "div", {
          className: "metaInfoBar"
        }, d.a.createElement( "div", {
          className: "metaInfo"
        }, d.a.createElement( "div", {
          className: "label"
        }, "Markdown Source Last Updated:" ), d.a.createElement( "div", {
          className: "value"
        }, new Date( s ).toString() ) ) ), d.a.createElement( "div", {
          className: "metaInfoBar"
        }, d.a.createElement( "div", {
          className: "metaInfo"
        }, d.a.createElement( "div", {
          className: "label"
        }, "Markdown Source Created:" ), d.a.createElement( "div", {
          className: "value"
        }, new Date( c ).toString() ) ) ) );
        return d.a.createElement( l.a, {
          pageTitle: o,
          slug: m,
          footerChildren: u,
          headingInfo: a.tableOfContents
        }, d.a.createElement( r.a, {
          title: o,
          description: w,
          slug: m
        } ), d.a.createElement( "div", {
          dangerouslySetInnerHTML: {
            __html: t
          }
        } ) )
      }
    }
  }
] );
//# sourceMappingURL=component---src-templates-generic-js-9d974f372e0b6e5e69a9.js.map
