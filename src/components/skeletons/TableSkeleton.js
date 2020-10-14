import React from "react";
import { Fade } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import MUIDataTable from "mui-datatables";

const MediatorsTable = () => {
  const columns = [
    "Nome",
    "Unidades de atuação",
    "Cidades de atuação",
    "Qualificação",
    "Valor médio",
  ];
  const data = Array.from(Array(40).keys()).map((m, index) => [
    <Skeleton key={index} variant="text" width={100} />,
    <Skeleton key={index} variant="text" width={100} />,
    <Skeleton key={index} variant="text" width={100} />,
    <Skeleton key={index} variant="text" width={100} />,
    <Skeleton key={index} variant="text" width={100} />,
  ]);
  const options = {
    filterType: "checkbox",
    responsive: "simple",
    elevation: 0,
    textLabels: {
      body: {
        noMatch: "Desculpe, nenhum resultado encontrado",
        toolTip: "Ordenar",
        columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
      },
      pagination: {
        next: "Próxima página",
        previous: "Página anterior",
        rowsPerPage: "Linhas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Pesquisar",
        downloadCsv: "Baixar CSV",
        print: "Imprimir",
        viewColumns: "Mostrar Colunas",
        filterTable: "Filtrar Tabela",
      },
      filter: {
        all: "Tudo",
        title: "FILTROS",
        reset: "RESETAR",
      },
      viewColumns: {
        title: "Mostrar Colunas",
        titleAria: "Mostrar/Esconder Colunas da Tabela",
      },
      selectedRows: {
        text: "linha(s) selecionado(s)",
        delete: "Excluir",
        deleteAria: "Excluir Linhas Selecionadas",
      },
    },
    page: 0,
    count: 40,
    rowsPerPage: 40,
    rowsPerPageOptions: [40, 60, 100],
  };

  return (
    <React.Fragment>
      <Fade in={true}>
        <MUIDataTable
          title={<Skeleton variant="text" width={150} height={35} />}
          data={data}
          columns={columns}
          options={options}
        />
      </Fade>
    </React.Fragment>
  );
};

export default MediatorsTable;
