import Chart from "react-google-charts";


const AdminStatistical = () => {


    const data = [
        ["age", "weight"],
        [8, 12],
        [4, 5.5],
        [11, 14],
        [4, 5],
        [36, 3.5],
        [6.5, 7]
      ];

      const data1 = [
        ['Year', 'Sales', 'Expenses', 'Profit'],
        ['2014', 1000, 400, 200],
        ['2015', 1170, 460, 250],
        ['2016', 660, 1120, 300],
        ['2017', 1030, 540, 350],
      ];

      const options = {
        title: 'Company Performance',
        hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
        vAxis: { minValue: 0 },
        colors: ['#FF0000', '#00FF00', '#0000FF'], // Cấu hình màu sắc cho 3 cột đầu tiên
      };


    return (
        <>Trang Thong Ke

            <Chart
                width={800}
                height={500}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={data1}
                options={options}
                rootProps={{ "data-testid": "2" }}
            />
        </>
    )
}

export default AdminStatistical;