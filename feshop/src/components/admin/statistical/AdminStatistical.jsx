import Chart from "react-google-charts";


const AdminStatistical = () => {


    const data = [
        ["age", "weight"],
        [8, 12],
        [4, 5.5],
        [11, 14],
        [4, 5],
        [3, 3.5],
        [6.5, 7]
      ];


    return (
        <>Trang Thong Ke

            <Chart
                width={800}
                height={500}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={data}
                options={{
                    title: "Doanh thu theo loại sản phẩm",
                    // Just add this option
                    is3D: true,
                }}
                rootProps={{ "data-testid": "2" }}
            />
        </>
    )
}

export default AdminStatistical;