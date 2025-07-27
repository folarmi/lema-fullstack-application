import { useEffect, useState } from "react";
import { CustomText } from "../components/CustomText";
import Table from "../components/Table";
import {
  ColumnDef,
  createColumnHelper,
  PaginationState,
} from "@tanstack/react-table";
import { PaginatedUsersResponse, User } from "../utils/types";
import { useGetData } from "../lib/apiCalls";
import { useLocation } from "react-router";

const UsersDashboard = () => {
  const location = useLocation();
  const restorePage = location.state?.restorePage;

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 4,
  });

  const { data: userData, isLoading } = useGetData<
    PaginatedUsersResponse<User>
  >({
    url: `/users?page=${pagination.pageIndex}&limit=${pagination.pageSize}`,
    queryKey: ["GetAllStatesTable", JSON.stringify(pagination)],
  });

  useEffect(() => {
    if (restorePage !== undefined) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: restorePage,
      }));
    }
  }, [restorePage]);

  const columnHelper = createColumnHelper<User>();
  const columns = [
    columnHelper.accessor("name", {
      header: "Full name",
      cell: (info) => {
        return (
          <div className="flex">
            <div className="">
              <CustomText variant="medium" className="text-gray_600">
                {info.getValue()}
              </CustomText>
            </div>
          </div>
        );
      },
    }) as ColumnDef<User>,
    columnHelper.accessor("email", {
      header: "Email Address",
      cell: (info) => {
        return (
          <div className="">
            <CustomText
              variant="textSm"
              className="text-gray_600 whitespace-pre-wrap"
            >
              {info.getValue()}
            </CustomText>
          </div>
        );
      },
    }) as ColumnDef<User>,
    columnHelper.accessor("address", {
      header: "Address",
      cell: (info) => {
        const address = info.getValue();
        const formatted = `${address?.street}, ${address?.state}, ${address?.city}, ${address?.zipcode}`;
        return (
          <div className="w-[392px] truncate">
            <CustomText
              variant="textSm"
              className="whitespace-nowrap overflow-hidden text-ellipsis block"
            >
              {formatted}
            </CustomText>
          </div>
        );
      },
    }) as ColumnDef<User>,
  ];

  const sortedData = userData?.data
    ?.slice()
    .sort((a: User, b: User) => a?.name.localeCompare(b.name));

  return (
    <div className="mx-auto w-full lg:w-[60%] px-4 sm:px-6 lg:px-8 mt-8 md:mt-16 lg:mt-32">
      <CustomText variant="displayXL">Users</CustomText>

      <main className="mt-4 md:mt-6 overflow-x-auto">
        <div className="min-w-[300px]">
          <Table
            data={sortedData || []}
            columns={columns}
            isLoading={isLoading}
            pagination={pagination}
            rowCount={userData?.total || 0}
            setPagination={setPagination}
          />
        </div>
      </main>
    </div>
  );
};

export { UsersDashboard };
