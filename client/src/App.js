import { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import Select from "./components/select";
import Label from "./components/label";
import LineBar from "./components/line-bar";
import HorizontalBar from "./components/horizontal-bar";
import Table from "./components/table";
import MultiTable from "./components/multi-table";

function App() {
  const [selected, setSelected] = useState();
  const [series, setSeries] = useState([]);
  const [data, setData] = useState([]);
  const [results, setResults] = useState({});

  const handleChange = async (value) => {
    setSelected(value);
    const rawData = await fetch(`http://localhost:3001/data/${value}`);
    const data = await rawData.json();
    setData(data);
    const rawResults = await fetch(`http://localhost:3001/results/${value}`);
    const results = await rawResults.json();
    setResults(results);
  };

  useEffect(() => {
    const getSeries = async () => {
      const raw = await fetch("http://localhost:3001/series");
      const res = await raw.json();
      setSeries(res);
      setSelected(res[0]);
      handleChange(res[0]);
    };
    getSeries();
  }, [setSeries]);

  return (
    <Container>
      <SelectContainer>
        <Label>Select series</Label>
        <Select value={selected} onChange={(e) => handleChange(e.target.value)} items={series} />
      </SelectContainer>

      <ChartsContainer>
        <ChartsSection>
          <ChartContainer flex='5'>
            <Label>Actual vs Predictions Plot</Label>
            {data && results.predictions && <LineBar selected={selected} data={data} results={results.predictions} />}
          </ChartContainer>

          <ChartContainer flex='2'>
            <Label>Feature importances</Label>
            {results.featureImportance && <HorizontalBar data={results.featureImportance} />}
          </ChartContainer>
        </ChartsSection>

        <ChartsSection>
          <ChartContainer flex='3'>
            <Label>Model Details</Label>
            {results.modelSummary && <Table header={["Property", "Value"]} data={results.modelSummary} />}
          </ChartContainer>
          <ChartContainer flex='3'>
            <Label>Scoring Metrics</Label>
            {results.scoring_metrics && <Table header={["Metrics", "Value"]} data={results.scoring_metrics} />}
          </ChartContainer>
          <ChartContainer flex='5'>
            <Label>Confusion matrix</Label>
            {data && results.predictions && (
              <MultiTable
                header={["", "Positive", "Negative"]}
                actual={data}
                prediction={results.predictions}
                selected={selected}
                leftLabel="Prediction values"
                topLabel="Actual values"
              />
            )}
          </ChartContainer>
        </ChartsSection>
      </ChartsContainer>
    </Container>
  );
}

export default App;

const Container = styled.div`
  ::webkit-scrollbar {
    width: 2px;
  }
`;

const SelectContainer = styled.div`
  width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 200px;
`;

const ChartsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 50px 20px 20px;
`;

const ChartsSection = styled.div`
  display: flex;
  overflow: auto;
  margin: 30px 0;
`;

const ChartContainer = styled.div`
  display: flex;
  flex: ${(p) => p.flex};
  flex-direction: column;
  padding: 0 10px;
`;
