import { ethers } from "//unpkg.com/ethers@5.5.1/dist/ethers.esm.min.js"

window.ethers = ethers

customElements.define(
  "code-editor",
  class CodeEditor extends HTMLElement {
    connectedCallback() {
      const code = this.innerHTML.trim()

      this.innerHTML = `
      <pre><code data-editor-input contenteditable spellcheck="false">${code}</code></pre>
      <button>Execute</button>
      <b>Result</b>
      <pre data-editor-result></pre>`

      this.querySelector("button").addEventListener("click", this.executeCode)
    }

    executeCode(e) {
      const parent = e.target.parentNode
      const code = parent.querySelector("[data-editor-input]").innerHTML.trim()
      const outputElement = parent.querySelector("[data-editor-result]")

      outputElement.innerHTML = "Executing..."

      let cleared = false
      const print = (data) => {
        const content = JSON.stringify(data, null, 2)
        if (cleared) {
          outputElement.innerHTML += content
          return
        }
        outputElement.innerHTML = content
        cleared = true
      }

      eval(`
        async function editorCode() {
          ${code}
        }
        editorCode()
      `)
    }
  }
)
