<svelte:options tag="llm-calc"/>

<div class="llm-calc-container">
  <form>
    <div class="row">
      <model-fieldset/>
      <optimizer-fieldset/>
    </div>
  </form>

  

  <!-- <table>
    <colgroup>
      <col class="def-col"/>
      <col/>
    </colgroup>
    <thead>
      <tr>
        <th>Head0</th>
        <th>Head1</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Bod0</td>
        <td>Bod1</td>
      </tr>
    </tbody>
  </table> -->
</div>

<style>
  pre {
    text-align: left;
    font-size: 0.8em;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
  }
  .llm-calc-container {
    text-align: left;
  }
  .definition-list-header {
    margin-bottom: 0;
  }
  
  .def-col {
    background-color: aliceblue;
    font-weight: 700;
  }
</style>
