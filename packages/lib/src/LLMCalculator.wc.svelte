<svelte:options tag="llm-calc"/>

<form class="llm-calc-container">
  <div class="row">
    <div class="col-6">
      <model-fieldset/>
    </div>
    <div class="col-6">
      <optimizer-fieldset/>
    </div>
  </div>
  <div class="row">
    <div class="col-6">
      <compute-fieldset/>
    </div>
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

<style>
  .row {
    display: flex;
    flex-wrap: wrap;
  }
  .row > * {
    flex-shrink: 0;
    width: 100%;
    max-width: 100%;
  }
  .llm-calc-container {
    text-align: left;
  }
  .col {
    flex: 1 1 0%;
  }
  .col-6 {
    flex: 0 0 auto;
    width: 50%;
  }
  .col-12 {
    flex: 0 0 auto;
    width: 100%;
  }
  
  /* .def-col {
    background-color: aliceblue;
    font-weight: 700;
  } */
</style>
