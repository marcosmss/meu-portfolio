const Snippets = {
  tags: function ({ id, advancedMatching, title, data }) {
    const script = `!(function(f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js"
      );
      fbq("init", "${id}" ${advancedMatching ? `,${advancedMatching}` : ""});`;

    const noscript = `<img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1" />`;

    const pageView = `fbq("track", "PageView");`;

    const track = `fbq("track", "${title}", ${JSON.stringify(data)});`

    return {
      script,
      noscript,
      pageView,
      track,
    };
  },
};

let snippets = {};

const PixelCode = {
  pixelCode(args) {
    snippets = Snippets.tags(args);

    const script = (s) => {
      const script = document.createElement("script");
      script.innerHTML = s || snippets.script;
      return script;
    };

    const noScript = () => {
      const noscript = document.createElement("noscript");
      noscript.innerHTML = snippets.noscript;
      return noscript;
    };

    return { script, noScript };
  },

  initialize({ id, advancedMatching }) {
    const pixelCode = this.pixelCode({ id, advancedMatching });

    document.head.insertBefore(pixelCode.script(), document.head.childNodes[0]);
    document.head.insertBefore(
      pixelCode.noScript(),
      document.head.childNodes[0]
    );
  },

  pageView() {
    const pixelCode = this.pixelCode({});

    document.head.insertBefore(
      pixelCode.script(snippets.pageView),
      document.head.childNodes[0]
    );
  },

  track({ title, data }) {
    const pixelCode = this.pixelCode({ title, data });

    document.head.insertBefore(
      pixelCode.script(snippets.track),
      document.head.childNodes[0]
    );
  },
};

// export default PixelCode;
