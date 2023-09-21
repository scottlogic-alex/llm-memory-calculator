<svelte:options tag="llm-calc"/>

<div class="llm-calc-container">
  <form>
    <div class="row">
      <model-fieldset/>
      <optimizer-fieldset/>
    </div>
    <div class="row">
      <compute-fieldset/>
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
  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
  }
  .llm-calc-container {
    text-align: left;
  }
  
  /* .def-col {
    background-color: aliceblue;
    font-weight: 700;
  } */
</style>
