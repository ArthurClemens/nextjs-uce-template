import loader from "uce-loader";
import { useEffect } from "react";

export const useUceLoader = () => {
  useEffect(() => {
    loader({
      on(component) {
        // first component found, load uce-template
        if (!this.q) {
          this.q = [component];
          const script = document.createElement("script");
          script.src = "https://unpkg.com/uce-template";
          document.body.appendChild(script).onload = () => {
            // get the uce-template class to use its .from(...)
            this.Template = customElements.get("uce-template");
            // load all queued components
            for (var q = this.q.splice(0), i = 0; i < q.length; i++)
              this.on(q[i]);
          };
        }
        // when uce-template is loaded
        else if (this.Template) {
          // ignore loading uce-template itself
          if (component !== "uce-template") {
            // load the component on demand
            fetch(`/webcomponents/${component}.uce`)
              .then((body) => body.text())
              .then((definition) => {
                document.body.appendChild(this.Template.from(definition));
              });
          }
        }
        // if uce-template is not loaded yet
        // add the component to the queue
        else if (this.q.indexOf(component) < 0) this.q.push(component);
      },
    });
  }, []);
};
