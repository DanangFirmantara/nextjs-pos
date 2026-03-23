package com.pos.service;

import com.pos.dto.TrxMenuCreateRequest;
import com.pos.dto.TrxMenuDetailRequest;
import com.pos.entity.TrxMenu;
import com.pos.entity.TrxMenuDetail;
import com.pos.entity.MasterMenu;
import com.pos.repository.TrxMenuRepository;
import com.pos.repository.TrxMenuDetailRepository;
import com.pos.repository.MasterMenuRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class TrxMenuServiceTest {
    @Mock
    private TrxMenuRepository trxMenuRepository;

    @Mock
    private TrxMenuDetailRepository trxMenuDetailRepository;

    @Mock
    private MasterMenuRepository masterMenuRepository;

    @InjectMocks
    private TrxMenuService trxMenuService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateWithDetails() {
        TrxMenuDetailRequest detail1 = new TrxMenuDetailRequest();
        detail1.setImenuId(13);
        detail1.setQty(1);
        detail1.setTotalTransaksi(10000L);
        
        TrxMenuDetailRequest detail2 = new TrxMenuDetailRequest();
        detail2.setImenuId(14);
        detail2.setQty(1);
        detail2.setTotalTransaksi(5000L);

        TrxMenuCreateRequest request = new TrxMenuCreateRequest();
        request.setItotalItem(2);
        request.setTotalTransaksi(15000L);
        request.setImetodePembayaran(7);
        request.setIpic(1);
        request.setCreatedBy(1);
        request.setTrxMenuDetail(Arrays.asList(detail1, detail2));

        TrxMenu savedMenu = new TrxMenu();
        savedMenu.setId(1);
        savedMenu.setVnoTransaksi("230326-000001");
        
        // Mock MasterMenu objects
        MasterMenu menu1 = new MasterMenu();
        menu1.setId(13);
        menu1.setVname("Menu 1");
        menu1.setIstock(10);
        
        MasterMenu menu2 = new MasterMenu();
        menu2.setId(14);
        menu2.setVname("Menu 2");
        menu2.setIstock(5);
        
        // Setup mocks
        when(trxMenuRepository.countByVnoTransaksiPrefix(anyString())).thenReturn(0);
        when(trxMenuRepository.save(any(TrxMenu.class))).thenReturn(savedMenu);
        when(trxMenuDetailRepository.save(any(TrxMenuDetail.class))).thenAnswer(invocation -> {
            TrxMenuDetail detail = invocation.getArgument(0);
            detail.setId(1);
            return detail;
        });
        when(masterMenuRepository.findById(13)).thenReturn(Optional.of(menu1));
        when(masterMenuRepository.findById(14)).thenReturn(Optional.of(menu2));
        when(masterMenuRepository.save(any(MasterMenu.class))).thenAnswer(invocation -> invocation.getArgument(0));

        TrxMenu result = trxMenuService.createWithDetails(request);

        assertNotNull(result);
        assertNotNull(result.getId());
        assertTrue(result.getVnoTransaksi().matches("\\d{6}-\\d{6}"));
        
        // Verify that stock was updated
        assertEquals(9, menu1.getIstock()); // 10 - 1 = 9
        assertEquals(4, menu2.getIstock()); // 5 - 1 = 4
        
        verify(trxMenuRepository, times(1)).save(any(TrxMenu.class));
        verify(trxMenuDetailRepository, times(2)).save(any(TrxMenuDetail.class));
        verify(masterMenuRepository, times(2)).save(any(MasterMenu.class));
    }

    @Test
    void testCreateWithDetailsInsufficientStock() {
        TrxMenuDetailRequest detail = new TrxMenuDetailRequest();
        detail.setImenuId(13);
        detail.setQty(20); // Qty lebih besar dari stock
        detail.setTotalTransaksi(200000L);

        TrxMenuCreateRequest request = new TrxMenuCreateRequest();
        request.setItotalItem(1);
        request.setTotalTransaksi(200000L);
        request.setImetodePembayaran(7);
        request.setIpic(1);
        request.setCreatedBy(1);
        request.setTrxMenuDetail(Arrays.asList(detail));

        TrxMenu savedMenu = new TrxMenu();
        savedMenu.setId(1);
        
        MasterMenu menu = new MasterMenu();
        menu.setId(13);
        menu.setVname("Menu 1");
        menu.setIstock(5); // Stock hanya 5
        
        when(trxMenuRepository.countByVnoTransaksiPrefix(anyString())).thenReturn(0);
        when(trxMenuRepository.save(any(TrxMenu.class))).thenReturn(savedMenu);
        when(masterMenuRepository.findById(13)).thenReturn(Optional.of(menu));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            trxMenuService.createWithDetails(request);
        });
        
        assertTrue(exception.getMessage().contains("Stock tidak cukup"));
    }
}
